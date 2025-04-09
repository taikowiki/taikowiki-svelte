import { songDBController } from '$lib/module/common/song/song.server';
import type { Difficulty } from '$lib/module/common/song/types.js';
import { userDBController } from '$lib/module/common/user/user.server.js';
import { docDBController } from '$lib/module/common/wikidoc/server/dbController.server.js';
import { renderer } from '$lib/module/common/wikidoc/util.js';
import type { Doc } from '$lib/module/common/wikidoc/types';
import { redirect } from '@sveltejs/kit';
import { runQuery } from '@yowza/db-handler';
import type { HTMLElement } from 'node-html-parser';

const docDataColumns: (keyof Doc.DB.DocDBData)[] = ['id', 'contentTree', 'editedTime', 'editableGrade', 'editorUUID', 'id', 'isDeleted', 'renderedContentTree', 'songNo', 'title', 'redirectTo', 'type'] as const;
type DocData = Pick<Doc.DB.DocDBData, (typeof docDataColumns)[number]> & { editor: string } & { contentTree: Doc.Data.ContentTree };

export async function load({ params, url, locals }) {
    const diff = (url.searchParams.get('diff') ?? 'oni') as Difficulty;

    const { song, docData } = await runQuery(async (run) => {
        const song = await songDBController.getSongBySongNo.getCallback(params.songNo)(run);
        if (!song) {
            return {
                song,
                docData: null
            }
        }

        const docData = (await docDBController.getColumnsWhere(docDataColumns, [['songNo', params.songNo]]))[0] as DocData ?? null;
        if (!docData) {
            return { song, docData }
        }

        if (docData.type !== "song" || docData.isDeleted) {
            return {
                song,
                docData: null
            }
        }

        const editor = (await userDBController.getNickname.getCallback(docData.editorUUID)(run)) ?? docData.editorUUID;
        const preparedContent: Doc.Data.ContentTree = {
            content: await renderer.prepareView(docData.renderedContentTree?.content as string, setWikiLinkAvailable),
            subParagraphs: await prepareSubParagraphs(docData.renderedContentTree?.subParagraphs as Doc.Data.DocParagraph[])
        };

        return {
            song,
            docData: {
                ...docData,
                editor,
                contentTree: preparedContent
            }
        }

        async function prepareSubParagraphs(subParagraphs: Doc.Data.DocParagraph[]) {
            const prepared: Doc.Data.DocParagraph[] = [];
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

    let canEditable = false;
    if (docData && locals.userData) {
        canEditable = locals.userData.grade >= docData.editableGrade;
    }

    return {
        song,
        docData: docData ? {
            ...docData,
            canEditable
        } as DocData & { canEditable: boolean } : null
    }
}