import { error } from '@sveltejs/kit';
import { queryBuilder, runQuery, Where } from '@yowza/db-handler';
import { Doc } from '$lib/module/doc/index.js';

const { parseDBData } = Doc;

export async function GET({locals, params}){
    const id = Number(params.id);
    if(Number.isNaN(id)){
        throw error(404);
    }

    try{
        await runQuery(async(run) => {
            if(!locals.userData || locals.userData.grade < 9){
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

            const query2 = queryBuilder.update('docs').set({isDeleted: 0}).where(Where.Compare('id', '=', id)).build();
            await run(query2);
        })
    }
    catch(err){
        throw err;
    }

    return new Response();
}