import { error, redirect } from '@sveltejs/kit';
import { Doc } from '$lib/module/doc/doc.server';

const {DBController} = Doc.Server;

export async function load({url}){
    const title = url.searchParams.get('title');

    if(!title){
        throw error(404);
    }

    const id = await DBController.getDocIdByTitle(title);

    if(id === null){
        throw error(404);
    }

    throw redirect(302, `/admin/doc/m/${id}`)
}