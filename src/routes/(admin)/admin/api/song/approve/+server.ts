import { Song } from '$lib/module/song/song.server';
import { error } from '@sveltejs/kit';

export async function POST({ request }) {
    const data = await request.json();

    const {order, songData} = data;
    if (!order) throw error(400);

    await Song.Server.reqDBController.approve(order, songData);

    return new Response();
}