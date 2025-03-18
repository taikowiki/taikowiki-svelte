import { docDBController } from '$lib/module/common/wikidoc/dbController.server.js';
import type { WikiDocData } from '$lib/module/common/wikidoc/types/wikidoc.types.js';
import { error } from '@sveltejs/kit';

export async function load({params}){
    const id = Number(params.id);
    if(Number.isNaN(id)){
        throw error(404);
    }

    const docDBData = await docDBController.getDocDataById(id);
    if(!docDBData){
        throw error(404);
    }

    const docData: WikiDocData = {
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