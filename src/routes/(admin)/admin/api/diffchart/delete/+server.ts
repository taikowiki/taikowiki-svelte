import { diffchartDBController } from '$lib/module/diffchart/diffchart.server.js';
import { error } from '@sveltejs/kit';

export async function POST({ request }) {
    const data = await request.json();

    if (!data.level) throw error(400);
    if (!data.type) throw error(400);

    try {
        await diffchartDBController.deleteDiffchart(data.level, data.type);
        return new Response();
    }
    catch (err) {
        console.log(err);
        throw error(500);
    }
}