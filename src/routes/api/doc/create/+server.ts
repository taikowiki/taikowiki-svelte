import { docDBController } from '$lib/module/common/wikidoc/dbController.server.js';
import { WikiError } from '$lib/module/common/wikidoc/wikiError.js';
import { error } from '@sveltejs/kit';
import { getClientAddress } from "$lib/module/common/util.server";

export async function POST(event) {
    const { request, locals } = event;

    if (!locals.userData) {
        throw error(401, JSON.stringify({
            reason: 'NOT_LOGINED'
        }))
    }

    const requestData = await request.json();

    try{
        await docDBController.create(locals.userData.UUID, getClientAddress(event), requestData.docData);
    }
    catch(err){
        console.log(err);
        if(err instanceof WikiError){
            return new Response(JSON.stringify({reason: err.code}), {status: 400});
        }
        else{
            throw error(500);
        }
    }

    return new Response();
}