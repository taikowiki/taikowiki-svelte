import SongDB, { SongRequestController } from '$lib/module/common/song/song.server.js';
import type { SongData } from '$lib/module/common/song/types.js';
import { error } from '@sveltejs/kit';

export async function POST({ request }) {
    const data = await request.json();
    
    const songData = data.songData as SongData;
    const order = data.order;
    if(songData === undefined || order === undefined) throw error(400);

    await SongDB.uploadSong(songData);
    await SongRequestController.removeRequest(order, songData.songNo);
    
    return new Response();
}