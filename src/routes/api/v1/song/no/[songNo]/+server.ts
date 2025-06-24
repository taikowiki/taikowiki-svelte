import { Song } from '$lib/module/song/song.server';
import { error } from '@sveltejs/kit';

export async function GET({ params }) {
    const { songNo } = params;

    const songData = await Song.Server.DBController.getSongBySongNo(songNo);

    if (!songData) {
        throw error(404);
    }

    return new Response(JSON.stringify(songData), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}