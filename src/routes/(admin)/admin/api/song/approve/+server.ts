import { SongRequestController } from '$lib/module/common/song/song.server.js';
import { error } from '@sveltejs/kit';

export async function POST({ request }) {
    const data = await request.json();

    const order = data.order;
    if (!order) throw error(400);

    await SongRequestController.approve(order);

    return new Response();
}