import SongDB, { SongRequestController } from "$lib/module/common/song/song.server";
import UserController from "$lib/module/common/user/user-controller.server.js";
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

    const requestor = await UserController.getNickname(request.UUID)

    return {
        request,
        song,
        requestor
    }
}