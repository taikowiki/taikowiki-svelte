import SongDB from '$lib/module/common/song/song.server.js'

export async function GET({params}){
    let songNo = params.songNo;
    return new Response(JSON.stringify((await SongDB.getBySongNo(songNo))[0] || {}), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}