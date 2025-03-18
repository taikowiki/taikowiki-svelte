import { userDBController } from '$lib/module/common/user/user.server.js';
import { docDBController } from '$lib/module/common/wikidoc/dbController.server';
import { renderer } from '$lib/module/common/wikidoc/renderer.js';
import type { WikiContentTree, WikiDocParagraph } from '$lib/module/common/wikidoc/types/wikidoc.types.js';
import type { WikiDocPageViewData } from '$lib/module/common/wikidoc/types/wikidoc.view.types.js';
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
            return {
                status: 2,
                data: {
                    songNo: docViewData.songNo
                }
            } as const
        }

        if (docViewData.isDeleted) {
            return {
                status: 3,
                data: {
                    title: docViewData.title
                }
            } as const
        }

        const preparedContent: WikiContentTree = {
            content: await renderer.prepareView(docViewData.renderedContentTree?.content as string, setWikiLinkAvailable),
            subParagraphs: await prepareSubParagraphs(docViewData.renderedContentTree?.subParagraphs as WikiDocParagraph[])
        };

        const editor = (await userDBController.getNickname.getCallback(docViewData.editorUUID)(run)) ?? docViewData.editorUUID;

        return {
            status: 4,
            data: {
                ...docViewData,
                editor,
                preparedContent,
                isDeleted: false
            } as WikiDocPageViewData & { isDeleted: false }
        } as const;

        async function prepareSubParagraphs(subParagraphs: WikiDocParagraph[]) {
            const prepared: WikiDocParagraph[] = [];
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
                throw redirect(302, `/doc/r/${data.redirectTo}`)
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
                    title: data.title,
                    isDeleted: true
                } as const
            }
        }
        case (4): {
            return {
                docViewData: data
            }
        }
        default: {
            throw error(404);
        }
    }
}