import Song from "$lib/module/common/song/song.server";

export async function GET(){
    console.log(await Song.getAll());
    return new Response(JSON.stringify(await Song.getAll()), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}