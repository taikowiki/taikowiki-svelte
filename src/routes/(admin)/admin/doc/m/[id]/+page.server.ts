import { error } from '@sveltejs/kit';
import { queryBuilder, runQuery, Where } from '@yowza/db-handler';
import { Doc } from '$lib/module/doc/index.js';

const { parseDBData } = Doc;

export async function load({params}){
    const id = Number(params.id);
    if(Number.isNaN(id)){
        throw error(404);
    }

    const docData = await runQuery(async(run) => {
        const columns = ['id', 'title', 'type', 'songNo', 'redirectTo', 'editableGrade', 'createdTime', 'editedTime', 'isDeleted', 'version'] as const;
        const query = queryBuilder.select('docs', [...columns]).where(Where.Compare('id', '=', id)).build();
        const r = await run(query);
        if(r.length === 0){
            return null;
        }
        
        return parseDBData<typeof columns[number]>(r[0])
    })

    if(!docData){
        throw error(404);
    }

    return {
        docData
    }
}