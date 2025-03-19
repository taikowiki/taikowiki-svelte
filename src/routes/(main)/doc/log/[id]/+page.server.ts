import { docDBController } from '$lib/module/common/wikidoc/dbController.server.js';
import { error } from '@sveltejs/kit';

export async function load({params, url}){
    const id = Number(params.id);
    if(Number.isNaN(id)){
        throw error(404);
    }

    const page = parseInt(url.searchParams.get('page') ?? '1')
    if(page < 1 || Number.isNaN(page)){
        throw error(404);
    }

    const logs = await docDBController
}