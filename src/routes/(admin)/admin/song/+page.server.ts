import SongDB from "$lib/module/common/song/song.server";

export async function load(){
    return {
        songs: await SongDB.getAll()
    }
}