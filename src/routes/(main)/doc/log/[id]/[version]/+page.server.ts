import { docDBController } from "$lib/module/common/wikidoc/server/dbController.server";
import type { Doc } from "$lib/module/common/wikidoc/types.js";
import { renderer } from "$lib/module/common/wikidoc/util";
import { error } from "@sveltejs/kit";
import { runQuery } from "@yowza/db-handler";
import type { HTMLElement } from "node-html-parser";

export async function load({ params }) {
    const id = Number(params.id);
    const version = Number(params.version);

    if (Number.isNaN(id) || Number.isNaN(version)) {
        throw error(404);
    }

    const docData = await runQuery(async (run) => {
        const pastDoc = await docDBController.getPast.getCallback(id, version)(run);
        if (!pastDoc) {
            return null;
        }

        const preparedContent: Doc.Data.ContentTree = {
            content: await renderer.prepareView(pastDoc.renderedContentTree?.content as string, setWikiLinkAvailable),
            subParagraphs: await prepareParagraphs(pastDoc.renderedContentTree?.subParagraphs as Doc.Data.DocParagraph[])
        };

        return {
            ...pastDoc,
            contentTree: preparedContent
        }

        /**
         * 하위 문단 준비
         * @param subParagraphs 
         * @returns 
         */
        async function prepareParagraphs(subParagraphs: Doc.Data.DocParagraph[]) {
            const prepared: Doc.Data.DocParagraph[] = [];
            for (const subParagraph of subParagraphs) {
                prepared.push({
                    title: subParagraph.title,
                    content: await renderer.prepareView(subParagraph.content, setWikiLinkAvailable),
                    subParagraphs: await prepareParagraphs(subParagraph.subParagraphs)
                })
            }
            return prepared;
        }
        /**
         * wiki-link가 사용가능한지 확인하고 속성 추가
         */
        async function setWikiLinkAvailable(dom: HTMLElement) {
            for (const wikiLinkElement of dom.querySelectorAll('wiki-link')) {
                const docTitle = wikiLinkElement.getAttribute('doctitle');
                if (!docTitle) {
                    wikiLinkElement.setAttribute('available', 'false');
                    continue;
                }

                const exists = await docDBController.docTitleExists.getCallback(docTitle)(run);
                if (exists) {
                    wikiLinkElement.setAttribute('available', 'true');
                }
                else {
                    wikiLinkElement.setAttribute('available', 'false');
                }
            }
        }
    });


    if (!docData) {
        throw error(404);
    }

    return {
        docData
    }
}