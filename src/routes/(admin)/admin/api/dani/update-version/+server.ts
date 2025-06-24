import { Dani } from '$lib/module/dani';
import '$lib/module/dani/dani.server.js';
import { error } from '@sveltejs/kit';

export async function POST({ request }) {
    const requestData: Dani.UpdateData = await request.json();

    try {
        Dani.Schema.UpdateData.parse(requestData);
    } catch {
        throw error(400);
    }

    await Dani.Server.DBController.updateVersion(requestData);

    return new Response();
}