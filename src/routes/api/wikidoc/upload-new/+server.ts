import { docDBHandler } from '$lib/module/common/wikidoc/dbhandler.server';
import { error } from '@sveltejs/kit';

export async function POST({ request, locals }) {
    if (!locals.userData) {
        throw error(401, JSON.stringify({
            reason: 'NOT_LOGINED'
        }))
    }

    const requestData = await request.json();

    await docDBHandler.uploadNewDoc(locals.userData.UUID, requestData.docData);

    return new Response();
}