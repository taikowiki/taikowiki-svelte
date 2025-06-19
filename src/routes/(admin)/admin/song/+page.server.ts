import {songDBController} from "$lib/module/common/song/song.server";
import type { Song } from "$lib/module/song";

export async function load() {
    return {
        songs: await songDBController.getAllColumns(["order", "songNo", "title"]) as Pick<Song.SongData, "songNo" | "title">[]
    }
}