import { songDBController } from '$lib/module/common/song/song.server.js'

export async function GET({ params }) {
    let songNo = params.songNo;
    return new Response(JSON.stringify(await songDBController.getSongBySongNo(songNo) || {}), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}