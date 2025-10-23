import { error } from '@sveltejs/kit';
import { runQuery } from '@yowza/db-handler';
import { Doc } from '$lib/module/doc/doc.server';
import type { RequestEvent } from './$types';

export async function GET({locals, params}: RequestEvent){
    const id = Number(params.id);
    if(Number.isNaN(id)){
        throw error(404);
    }

    try{
        await runQuery(async(run) => {
            if(!locals.userData || locals.userData.grade < 9){
                throw error(403);
            }

            const editableGrade = await Doc.Server.DBController.getEditableGrade.getCallback(id)(run);
            if(editableGrade === null){
                throw error(404);
            }
            if(locals.userData.grade < editableGrade){
                throw error(403);
            }

            await Doc.Server.DBController.restore.getCallback(id)(run);
        })
    }
    catch(err){
        throw err;
    }

    return new Response();
}