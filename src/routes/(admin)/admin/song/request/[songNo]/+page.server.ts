import SongDB, { SongRequestController } from "$lib/module/common/song/song.server";
import type { SongRequest } from "$lib/module/common/song/types.js";

export async function load({ params }) {
    let requests = await SongRequestController.getRequestsBySongNo(params.songNo)
    return {
        requests
    }
}