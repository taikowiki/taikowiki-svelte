import { Song } from '$lib/module/song/song.server';
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const { songNo } = params;

    const requests = await Song.Server.reqDBController.getRequestsBySongNo(songNo, "none");

    return {
        requests
    }
}