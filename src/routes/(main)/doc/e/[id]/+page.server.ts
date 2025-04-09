import { docDBController } from '$lib/module/common/wikidoc/server/dbController.server.js';
import type { Doc } from '$lib/module/common/wikidoc/types';
import { error } from '@sveltejs/kit';
import { queryBuilder, runQuery, Where } from '@yowza/db-handler';

export async function load({ params, locals, url }) {
    if (!locals.userData) {
        throw error(401);
    }

    const id = Number(params.id);
    if (Number.isNaN(id)) {
        throw error(404);
    }

    let version: number | null = Number(url.searchParams.get('version'));
    if(Number.isNaN(version) || version <= 0){
        version = null;
    }

    const { docDBData, redirectTo, editableGrade } = await runQuery(async (run) => {
        if(version){
            var docDBData: any = await docDBController.getPast.getCallback(id, version)(run);
            const query = queryBuilder.select('docs', ['editableGrade']).where(Where.Compare('id', '=', id)).build();
            const r =  await run(query);
            var editableGrade: number = r[0]?.editableGrade ?? 10;
        }
        else{
            var docDBData: any = await docDBController.getDocDataById.getCallback(id)(run);
            var editableGrade: number = docDBData?.editableGrade ?? 10;
        }

        const redirectTo = docDBData?.redirectTo ?
            (await docDBController.getColumnsWhere.getCallback(['title'], [['id', docDBData.redirectTo]])(run))[0]?.title ?? null : null;
        return { docDBData, redirectTo, editableGrade }
    })
    if (!docDBData) {
        throw error(404);
    }
    if (locals.userData.grade < 2 || locals.userData.grade < editableGrade) {
        throw error(403);
    }

    const docData: Doc.Data.DocData = {
        title: docDBData.title,
        type: docDBData.type as any,
        contentTree: docDBData.contentTree as any,
        songNo: docDBData.songNo as any,
        comment: docDBData.comment,
        redirectTo
    };

    return {
        docData
    }
}