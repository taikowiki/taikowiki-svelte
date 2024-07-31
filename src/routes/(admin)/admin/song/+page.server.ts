import {songDBController} from "$lib/module/common/song/song.server";
import { type SongData } from "$lib/module/common/song/types";

export async function load() {
    return {
        songs: await songDBController.getAllColumns(["order", "songNo", "title"]) as Pick<SongData, "songNo" | "title">[]
    }
}