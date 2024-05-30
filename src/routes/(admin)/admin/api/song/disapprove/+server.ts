import SongDB from '$lib/module/common/song/song.server.js';
import { error } from '@sveltejs/kit';
import { runQuery } from '@sveltekit-board/db';

export async function POST({ request }) {
    const data = await request.json();
    
    const order = data.order;
    if(order === undefined) throw error(400);

    await runQuery(async(run) => {
        return await run("DELETE FROM `song/request` WHERE `order` = ?", [order]);
    })
    
    return new Response();
}