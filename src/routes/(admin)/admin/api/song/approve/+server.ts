import SongDB from '$lib/module/common/song/song.server.js';
import { error } from '@sveltejs/kit';
import { runQuery } from '@sveltekit-board/db';

export async function POST({ request }) {
    const data = await request.json();
    
    const songData = data.songData;
    const order = data.order;
    if(songData === undefined || order === undefined) throw error(400);

    await SongDB.uploadSong(songData);
    await runQuery(async(run) => {
        return await run("DELETE FROM `song/request` WHERE `order` <= ? AND `songNo` = ?", [order, songData.songNo]);
    })
    
    return new Response();
}