import { error } from '@sveltejs/kit';
import { runQuery } from '@yowza/db-handler';
import { Doc } from '$lib/module/doc/index.js';
import type { RequestEvent } from './$types';

const { parseDBData } = Doc;

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

            const query1 = queryBuilder.select('docs', ['editableGrade']).where(Where.Compare('id', '=', id)).build();
            const r1 = await run(query1);
            if(r1.length === 0){
                throw error(404);
            }
            const {editableGrade} = parseDBData(r1[0]);

            if(locals.userData.grade < editableGrade){
                throw error(403);
            }

            const query2 = queryBuilder.update('docs').set('editableGrade', grade).where(Where.Compare('id', '=', id)).build();
            await run(query2);
        })
    }
    catch(err){
        throw err;
    }

    return new Response();
}