import { DaniServer } from '$lib/module/common/dani/dani.server.js';
import { DaniType } from '$lib/module/common/dani/types.js';
import { error } from '@sveltejs/kit';

export async function POST({ request }) {
    const requestData: DaniType.UpdateData = await request.json();

    try {
        DaniType.Schema.UpdateData.parse(requestData);
    } catch {
        throw error(400);
    }

    await DaniServer.DBController.updateVersion(requestData);

    return new Response();
}