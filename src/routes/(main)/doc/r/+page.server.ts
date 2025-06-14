import { Doc } from "$lib/module/doc/doc.server";
import { error, redirect } from '@sveltejs/kit';

const {DBController} = Doc.Server;

export async function load({url}){
    const id = Number(url.searchParams.get('id'));
    if(Number.isNaN(id)){
        throw error(404);
    }

    const title = await DBController.getDocTitleById(id);
    if(!title){
        throw error(404);
    }

    throw redirect(302, `/doc/r/${encodeURIComponent(title)}`);
}