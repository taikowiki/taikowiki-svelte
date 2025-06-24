import { Song } from '$lib/module/song/song.server';

export async function load() {
    return {
        songs: await Song.Server.DBController.getAllColumns(["order", "songNo", "title"]) as Pick<Song.SongData, "songNo" | "title">[]
    }
}