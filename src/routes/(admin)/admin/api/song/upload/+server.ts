import SongDB from '$lib/module/common/song/song.server.js';

export async function POST({ request }) {
    const data = await request.json();
    await SongDB.uploadSong(data.songNo, data.songData);
    return new Response();
}