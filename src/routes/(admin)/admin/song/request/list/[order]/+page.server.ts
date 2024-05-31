import SongDB, { SongRequestController } from "$lib/module/common/song/song.server";
import type { SongRequest } from "$lib/module/common/song/types.js";
import UserController from "$lib/module/common/user/user-controller.server.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const request = await SongRequestController.getRequestByOrder(params.order)

    if (request === null) {
        throw error(404);
    }

    return {
        request,
        requester: await UserController.getNickname(request.UUID)
    }
}