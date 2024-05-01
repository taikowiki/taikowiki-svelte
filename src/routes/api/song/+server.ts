import SongDB from "$lib/module/common/song/song.server";

export async function GET(){
    return new Response(JSON.stringify(await SongDB.getAll()), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}