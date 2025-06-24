import { Doc } from "$lib/module/doc/doc.server";
import { error } from '@sveltejs/kit';

const { DBController } = Doc.Server;

export async function load({ locals, url }) {
    const title = url.searchParams.get('title');
    if (title) {
        const docId = await DBController.getDocIdByTitle(title);
        if (docId !== null){
            return {
                redirect: docId
            }
        }
    }

    if (!locals.userData) {
        throw error(401);
    }
    if (locals.userData.grade < 2) {
        throw error(403);
    }
}