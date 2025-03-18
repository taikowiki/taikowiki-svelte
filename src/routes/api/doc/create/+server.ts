import { docDBController } from '$lib/module/common/wikidoc/dbController.server.js';
import { WikiError } from '$lib/module/common/wikidoc/wikiError.js';
import { error } from '@sveltejs/kit';

export async function POST({ request, locals }) {
    if (!locals.userData) {
        throw error(401, JSON.stringify({
            reason: 'NOT_LOGINED'
        }))
    }

    const requestData = await request.json();

    try{
        await docDBController.uploadNewDoc(locals.userData.UUID, requestData.docData);
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