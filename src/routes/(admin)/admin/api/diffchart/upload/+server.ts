import { diffchartDBController } from '$lib/module/diffchart/diffchart.server.js';
import { error } from '@sveltejs/kit';

export async function POST({ request }) {
    const diffchartData = await request.json();

    if (!diffchartData.name) throw error(400);
    if (!diffchartData.level) throw error(400);
    if (!diffchartData.type) throw error(400);
    if (!diffchartData.data || typeof (diffchartData) !== "object" || Array.isArray(diffchartData)) throw error(400);

    try {
        await diffchartDBController.uploadDiffchart(diffchartData);
        return new Response();
    }
    catch (err) {
        console.log(err);
        throw error(500);
    }
}