import SongDB from "$lib/module/common/song/song.server";
import { type SongData } from "$lib/module/common/song/types";

export async function load() {
    return {
        songs: await SongDB.getAll<Pick<SongData, "songNo" | "title">>(["order", "songNo", "title"])
    }
}