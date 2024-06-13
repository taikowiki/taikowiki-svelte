import SongDB, { SongRequestController } from "$lib/module/common/song/song.server";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const { songNo } = params;

    const requests = await SongRequestController.getRequestsBySongNo(songNo, "none");

    return {
        requests
    }
}