import { Song } from '$lib/module/song/song.server';

export async function GET({ params }) {
    let songNo = params.songNo;
    return new Response(JSON.stringify(await Song.Server.DBController.getSongBySongNo(songNo) || {}), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}