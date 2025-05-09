import { docDBController } from '$lib/module/common/wikidoc/server/dbController.server.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({url}){
    const id = Number(url.searchParams.get('id'));
    if(Number.isNaN(id)){
        throw error(404);
    }

    const title = await docDBController.getDocTitleById(id);
    if(!title){
        throw error(404);
    }

    throw redirect(302, `/doc/r/${encodeURIComponent(title)}`);
}