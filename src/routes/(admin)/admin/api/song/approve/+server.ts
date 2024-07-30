import { songRequestDBController } from '$lib/module/common/song/song.server.js';
import { error } from '@sveltejs/kit';

export async function POST({ request }) {
    const data = await request.json();

    const {order, songData} = data;
    if (!order) throw error(400);

    await songRequestDBController.approve(order, songData);

    return new Response();
}