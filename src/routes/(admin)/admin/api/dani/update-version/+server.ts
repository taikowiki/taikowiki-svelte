import { DaniServer } from '$lib/module/dani/dani.server.js';
import { Dani } from '$lib/module/dani/types.js';
import { error } from '@sveltejs/kit';

export async function POST({ request }) {
    const requestData: Dani.UpdateData = await request.json();

    try {
        Dani.Schema.UpdateData.parse(requestData);
    } catch {
        throw error(400);
    }

    await DaniServer.DBController.updateVersion(requestData);

    return new Response();
}