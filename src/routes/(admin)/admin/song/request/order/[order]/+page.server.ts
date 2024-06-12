import SongDB, { SongRequestController } from "$lib/module/common/song/song.server";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const order = Number(params.order);
    if (isNaN(order)) {
        throw error(400);
    }

    const request = await SongRequestController.getRequestByOrder(order);
    if (!request) {
        throw error(404);
    }

    const song = await SongDB.getBySongNo(request.songNo);

    return {
        request,
        song
    }
}