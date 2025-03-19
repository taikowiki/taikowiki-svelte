import { songDBController } from '$lib/module/common/song/song.server.js';
import { userDBController } from '$lib/module/common/user/user.server.js';
import { docDBController } from '$lib/module/common/wikidoc/dbController.server';
import { renderer } from '$lib/module/common/wikidoc/renderer.js';
import type {Doc} from '$lib/module/common/wikidoc/types';
import { error, redirect } from '@sveltejs/kit';
import { runQuery } from '@yowza/db-handler';
import type { HTMLElement } from 'node-html-parser';

export async function load({ params }) {
    const {
        status,
        data
    } = await runQuery(async (run) => {
        const docViewData = await docDBController.getDocViewDataByTitle(params.title);
        if (!docViewData) {
            return {
                status: 0
            } as const;
        }

        // 삭제되었으면 삭제되었다고 표기
        if(docViewData.isDeleted){
            return {
                status: 3,
                data: docViewData
            }
        }

        // 리다이렉트면 리다이렉트 시키기
        if (docViewData.type === "redirect") {
            const redirectTo = await docDBController.getDocTitleById(docViewData.redirectTo as number);
            return {
                status: 1,
                data: {
                    redirectTo
                }
            } as const
        }

        if (docViewData.type === "song") {
            // 곡 문서이고 해당 곡 번호를 가진 곡이 존재함
            if(docViewData.songNo && await songDBController.songExistsBySongNo(docViewData.songNo)){
                return {
                    status: 2,
                    data: {
                        songNo: docViewData.songNo
                    }
                } as const
            }
        }

        const preparedContent: Doc.Data.WikiContentTree = {
            content: await renderer.prepareView(docViewData.renderedContentTree?.content as string, setWikiLinkAvailable),
            subParagraphs: await prepareSubParagraphs(docViewData.renderedContentTree?.subParagraphs as Doc.Data.WikiDocParagraph[])
        };

        const editor = (await userDBController.getNickname.getCallback(docViewData.editorUUID)(run)) ?? docViewData.editorUUID;

        return {
            status: 3,
            data: {
                ...docViewData,
                editor,
                preparedContent
            } as Doc.View.Page.ViewData & { isDeleted: false }
        } as const;

        async function prepareSubParagraphs(subParagraphs: Doc.Data.WikiDocParagraph[]) {
            const prepared: Doc.Data.WikiDocParagraph[] = [];
            for (const subParagraph of subParagraphs) {
                prepared.push({
                    title: subParagraph.title,
                    content: await renderer.prepareView(subParagraph.content, setWikiLinkAvailable),
                    subParagraphs: await prepareSubParagraphs(subParagraph.subParagraphs)
                })
            }
            return prepared;
        }
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
    })

    switch (status) {
        case (0): {
            throw error(404);
        }
        case (1): {
            if (data.redirectTo === null) {
                throw error(404);
            }
            else {
                throw redirect(302, `/doc/r/${encodeURIComponent(data.redirectTo)}`)
            }
        }
        case (2): {
            if (data.songNo === null) {
                throw error(404);
            }
            throw redirect(302, `/song/${data.songNo}`)
        }
        case (3): {
            return {
                docViewData: {
                    ...data
                } as const
            }
        }
        default: {
            throw error(404);
        }
    }
}