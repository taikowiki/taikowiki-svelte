import { Song } from '$lib/module/song/song.server';
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const song = await Song.Server.DBController.getSongBySongNo(params.songNo);

    if (song === null) {
        throw error(404)
    }
    return {
        song
    }
}