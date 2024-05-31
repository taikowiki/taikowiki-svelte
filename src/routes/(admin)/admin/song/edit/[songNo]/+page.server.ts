import SongDB from "$lib/module/common/song/song.server";
import { error } from "@sveltejs/kit";

export async function load({params}) {
    const song = await SongDB.getBySongNo(params.songNo);
    if(song === null){
        throw error(404)
    }
    return {
        song
    }
}