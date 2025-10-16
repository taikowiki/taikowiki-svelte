import { error } from '@sveltejs/kit';
import { runQuery } from '@yowza/db-handler';
import { Doc } from '$lib/module/doc/doc.server';
import type { RequestEvent } from './$types';

export async function POST({locals, params, request}: RequestEvent){
    const id = Number(params.id);
    if(Number.isNaN(id)){
        throw error(404);
    }

    try{
        var requestData = await request.json();
    }
    catch{
        throw error(400);
    }
    const grade = requestData.grade as number;
    if(typeof(grade) !== "number" || grade < 1 || grade > 10 || !Number.isInteger(grade)){
        throw error(400)
    }

    try{
        await runQuery(async(run) => {
            if(!locals.userData || locals.userData.grade < 9 || locals.userData.grade < grade){
                throw error(403);
            }

            const editableGrade = await Doc.Server.DBController.getEditableGrade.getCallback(id)(run);
            if(editableGrade === null){
                throw error(404);
            }
            if(locals.userData.grade < editableGrade){
                throw error(403);
            }

            await Doc.Server.DBController.setEditableGrade.getCallback(id, grade)(run);
        })
    }
    catch(err){
        throw err;
    }

    return new Response();
}