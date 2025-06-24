import { error } from '@sveltejs/kit';
import { Util } from '$lib/module/util/util.server';
import { Doc } from "$lib/module/doc/doc.server";

const { WikiError } = Doc;
const { getClientAddress } = Util.Server;

export async function POST(event) {
    const { request, locals } = event;

    if (!locals.userData) {
        throw error(401, JSON.stringify({
            reason: 'NOT_LOGINED'
        }))
    }

    if (locals.userData.grade < 2) {
        throw error(403, JSON.stringify({
            reason: 'LOW_GRADE'
        }))
    }

    const requestData = await request.json();

    try {
        await Doc.Server.DBController.create(locals.userData.UUID, getClientAddress(event), requestData.docData);
    }
    catch (err) {
        console.log(err);
        if (err instanceof WikiError) {
            return new Response(JSON.stringify({ reason: err.code }), { status: 400 });
        }
        else {
            throw error(500);
        }
    }

    return new Response();
}