import SongDB from '$lib/module/common/song/song.server.js'

export async function GET({params}){
    let songNo = parseInt(params.songNo);
    if(isNaN(songNo)){
        return new Response('', {
            status: 400
        })
    }
    return new Response(JSON.stringify((await SongDB.getBySongNo(songNo))[0] || {}), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}