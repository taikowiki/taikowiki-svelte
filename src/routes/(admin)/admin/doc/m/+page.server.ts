import { docDBController } from '$lib/module/common/wikidoc/server/dbController.server.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({url}){
    const title = url.searchParams.get('title');

    if(!title){
        throw error(404);
    }

    const id = await docDBController.getDocIdByTitle(title);

    if(id === null){
        throw error(404);
    }

    throw redirect(302, `/admin/doc/m/${id}`)
}