import SongDB from "$lib/module/common/song/song.server";

export async function GET(){
    return new Response((await SongDB.getUpdateTime() || await SongDB.getCreateTime() || 0).toString())
}