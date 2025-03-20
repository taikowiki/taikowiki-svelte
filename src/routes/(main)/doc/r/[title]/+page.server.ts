import { songDBController } from '$lib/module/common/song/song.server.js';
import { userDBController } from '$lib/module/common/user/user.server.js';
import { docDBController } from '$lib/module/common/wikidoc/server/dbController.server';
import { renderer } from '$lib/module/common/wikidoc/util.js';
import type { Doc } from '$lib/module/common/wikidoc/types';
import { error, redirect } from '@sveltejs/kit';
import { runQuery } from '@yowza/db-handler';
import type { HTMLElement } from 'node-html-parser';

export async function load({ params, locals }) {
    const columns: (keyof Doc.DB.DocDBData)[] = ['id', 'contentTree', 'editedTime', 'editableGrade', 'editorUUID', 'id', 'isDeleted', 'renderedContentTree', 'songNo', 'title', 'redirectTo', 'type'] as const;
    type DocData = Pick<Doc.DB.DocDBData, (typeof columns)[number]> & { editor: string } & { contentTree: Doc.Data.ContentTree };

    try {
        const docData = await runQuery<DocData>(async (run) => {            
            // db View Data 가져오기
            const docData = (await docDBController.getColumnsWhere(columns, [['title', params.title]]))[0] as DocData ?? null;
            if (!docData) {
                throw error(404);
            }
            const editor = (await userDBController.getNickname.getCallback(docData.editorUUID)(run)) ?? docData.editorUUID;

            // 삭제되었으면 삭제되었다고 표기하기
            if (docData.isDeleted) {
                return { ...docData, editor };
            }

            // 리다이렉트면 리다이렉트 시키기
            if (docData.type === "redirect") {
                if (!docData.redirectTo) {
                    return {
                        ...docData,
                        isDeleted: true,
                        editor
                    }
                }
                const redirectDocTitle = await docDBController.getDocTitleById.getCallback(docData.redirectTo)(run);
                if (redirectDocTitle) {
                    throw redirect(302, `/doc/r/${encodeURIComponent(redirectDocTitle)}?from=${encodeURIComponent(docData.title)}`)
                }
                else {
                    return {
                        ...docData,
                        isDeleted: true,
                        editor
                    }
                }
            }

            if (docData.type === "song") {
                // 곡 문서이고 해당 곡 번호를 가진 곡이 존재함
                if (docData.songNo && await songDBController.songExistsBySongNo.getCallback(docData.songNo)(run)) {
                    throw redirect(302, `/song/${docData.songNo}`)
                }
            }

            const preparedContent: Doc.Data.ContentTree = {
                content: await renderer.prepareView(docData.renderedContentTree?.content as string, setWikiLinkAvailable),
                subParagraphs: await prepareParagraphs(docData.renderedContentTree?.subParagraphs as Doc.Data.DocParagraph[])
            };
            return {
                ...docData,
                editor,
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

        return {
            docData,
            canEditable: locals.userData ? locals.userData.grade >= docData.editableGrade : false
        }
    }
    catch (err) {
        throw err;
    }
}