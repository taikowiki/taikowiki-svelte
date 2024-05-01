import SongDB from "$lib/module/common/song/song.server";

export async function GET(){
    return new Response((await SongDB.getUpdateTime()).toString())
}