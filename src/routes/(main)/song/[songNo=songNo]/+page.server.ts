import { Song } from '$lib/module/song/song.server';
import { User } from "$lib/module/user";
import '$lib/module/user/user.client';
import { Doc } from "$lib/module/doc/doc.server";
import { redirect } from '@sveltejs/kit';
import { runQuery } from '@yowza/db-handler';

const { renderer } = Doc;
const { prepareParagraphs, setWikiLinkAvailable } = Doc.Server;

const docDataColumns: (keyof Doc.DB.DocDBData)[] = ['id', 'contentTree', 'editedTime', 'editableGrade', 'editorUUID', 'id', 'isDeleted', 'renderedContentTree', 'songNo', 'title', 'redirectTo', 'type'] as const;
type DocData = Pick<Doc.DB.DocDBData, (typeof docDataColumns)[number]> & { editor: string } & { contentTree: Doc.Data.ContentTree };

export async function load({ params, url, locals }) {
    const diff = (url.searchParams.get('diff') ?? 'oni') as Song.Difficulty;

    const { song, docData } = await runQuery(async (run) => {
        const song = await Song.Server.DBController.getSongBySongNo.getCallback(params.songNo)(run);
        if (!song) {
            return {
                song,
                docData: null
            }
        }

        const docData = (await Doc.Server.DBController.getColumnsWhere(docDataColumns, [['songNo', params.songNo]]))[0] as DocData ?? null;
        if (!docData) {
            return { song, docData }
        }

        if (docData.type !== "song" || docData.isDeleted) {
            return {
                song,
                docData: null
            }
        }

        const editor = docData.editorUUID ? (await User.Server.DBController.getNickname.getCallback(docData.editorUUID)(run)) ?? docData.editorUUID : docData.editorIp;
        const preparedContent: Doc.Data.ContentTree = {
            content: await renderer.prepareView(docData.renderedContentTree?.content as string, async (dom) => { await setWikiLinkAvailable(dom, run) }),
            subParagraphs: await prepareParagraphs(docData.renderedContentTree?.subParagraphs as Doc.Data.DocParagraph[], run)
        };

        return {
            song,
            docData: {
                ...docData,
                editor,
                contentTree: preparedContent
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