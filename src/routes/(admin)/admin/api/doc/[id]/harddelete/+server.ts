import { error } from '@sveltejs/kit';
import { queryBuilder, runQuery, Where } from '@yowza/db-handler';
import { Doc } from '$lib/module/doc/doc.server';

const { parseDBData } = Doc;
const {DBController} = Doc.Server;

export async function DELETE(event){
    const {locals, params} = event;
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

            await DBController.hardDelete.getCallback(id)(run);
        })
    }
    catch(err){
        throw err;
    }

    return new Response();
}