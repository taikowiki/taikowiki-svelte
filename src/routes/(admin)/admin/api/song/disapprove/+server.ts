import { Song } from '$lib/module/song/song.server';
import { error } from '@sveltejs/kit';

export async function POST({ request }) {
    const data = await request.json();

    const order = data.order;
    if (order === undefined) throw error(400);

    await Song.Server.reqDBController.disapprove(order);

    return new Response();
}