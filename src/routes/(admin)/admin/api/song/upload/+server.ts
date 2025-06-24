import { Song } from '$lib/module/song/song.server';

export async function POST({ request }) {
    const data = await request.json();
    await Song.Server.DBController.uploadSong(data.songNo, data.songData);
    return new Response();
}