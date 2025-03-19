import { docDBController } from '$lib/module/common/wikidoc/dbController.server.js';
import type {Doc} from '$lib/module/common/wikidoc/types';
import { error } from '@sveltejs/kit';

export async function load({params, locals}){
    if(!locals.userData){
        throw error(401);
    }

    const id = Number(params.id);
    if(Number.isNaN(id)){
        throw error(404);
    }

    const docDBData = await docDBController.getDocDataById(id);
    if(!docDBData){
        throw error(404);
    }

    if(locals.userData.grade < 2 || locals.userData.grade < docDBData.editableGrade){
        throw error(403);
    }

    const docData: Doc.Data.WikiDocData = {
        title: docDBData.title,
        type: docDBData.type as any,
        contentTree: docDBData.contentTree as any,
        songNo: docDBData.songNo as any,
        comment: docDBData.comment
    }

    return {
        docData
    }
}