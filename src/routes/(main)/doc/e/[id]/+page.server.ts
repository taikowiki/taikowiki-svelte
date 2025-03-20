import { docDBController } from '$lib/module/common/wikidoc/server/dbController.server.js';
import type { Doc } from '$lib/module/common/wikidoc/types';
import { error } from '@sveltejs/kit';
import { runQuery } from '@yowza/db-handler';

export async function load({ params, locals }) {
    if (!locals.userData) {
        throw error(401);
    }

    const id = Number(params.id);
    if (Number.isNaN(id)) {
        throw error(404);
    }

    const { docDBData, redirectTo } = await runQuery(async (run) => {
        const docDBData = await docDBController.getDocDataById(id);
        const redirectTo = docDBData?.redirectTo ?
            (await docDBController.getColumnsWhere(['title'], [['id', docDBData.redirectTo]]))[0]?.title ?? null : null;
        return { docDBData, redirectTo }
    })
    if (!docDBData) {
        throw error(404);
    }
    if (locals.userData.grade < 2 || locals.userData.grade < docDBData.editableGrade) {
        throw error(403);
    }

    const docData: Doc.Data.WikiDocData = {
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