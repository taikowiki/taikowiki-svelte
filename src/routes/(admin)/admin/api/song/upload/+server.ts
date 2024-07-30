import {songDBController} from '$lib/module/common/song/song.server.js';

export async function POST({ request }) {
    const data = await request.json();
    await songDBController.uploadSong(data.songNo, data.songData);
    return new Response();
}