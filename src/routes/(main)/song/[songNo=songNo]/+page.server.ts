import { songDBController } from '$lib/module/common/song/song.server';
import type { Difficulty } from '$lib/module/common/song/types.js';
import { userDBController } from '$lib/module/common/user/user.server.js';
import { docDBController } from '$lib/module/common/wikidoc/dbController.server.js';
import { renderer } from '$lib/module/common/wikidoc/renderer.js';
import type {Doc} from '$lib/module/common/wikidoc/types';
import { redirect } from '@sveltejs/kit';
import { runQuery } from '@yowza/db-handler';
import type { HTMLElement } from 'node-html-parser';

export async function load({ params, url }) {
    const diff = (url.searchParams.get('diff') ?? 'oni') as Difficulty;

    const {song, docViewData} = await runQuery(async(run) => {
        const song = await songDBController.getSongBySongNo.getCallback(params.songNo)(run);
        if(!song){
            return {
                song,
                docViewData: null
            }
        }

        const docViewData = await docDBController.getDocViewDataBySongNo.getCallback(params.songNo)(run);
        if(!docViewData){
            return {
                song, docViewData
            }
        }

        if(docViewData.type !== "song" || docViewData.isDeleted){
            return {
                song,
                docViewData: null
            }
        }

        const editor = (await userDBController.getNickname.getCallback(docViewData.editorUUID)(run)) ?? docViewData.editorUUID;
        const preparedContent: Doc.Data.WikiContentTree = {
            content: await renderer.prepareView(docViewData.renderedContentTree?.content as string, setWikiLinkAvailable),
            subParagraphs: await prepareSubParagraphs(docViewData.renderedContentTree?.subParagraphs as Doc.Data.WikiDocParagraph[])
        };
        const docPageViewData = {
            ...docViewData,
            preparedContent,
            editor
        }

        return {
            song,
            docViewData: docPageViewData
        }

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

    if (song && !song?.courses?.[diff]) {
        redirect(303, `/song/${params.songNo}?diff=oni`)
    }

    return {
        song,
        docViewData
    }
}