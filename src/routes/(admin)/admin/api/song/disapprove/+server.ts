import { SongRequestController } from '$lib/module/common/song/song.server.js';
import { error } from '@sveltejs/kit';

export async function POST({ request }) {
    const data = await request.json();
    
    const order = data.order;
    if(order === undefined) throw error(400);

    await SongRequestController.removeRequest(order);
    
    return new Response();
}