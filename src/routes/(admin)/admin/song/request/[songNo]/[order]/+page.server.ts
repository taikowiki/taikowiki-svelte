import { SongRequestController } from "$lib/module/common/song/song.server";
import UserController from "$lib/module/common/user/user-controller.server.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    let requests = await SongRequestController.getRequestsBySongNo(params.songNo, params.order);

    const request = requests[0] ?? null;
    if(request === null){
        throw error(404);
    }

    return {
        request,
        requester: await UserController.getNickname(request.UUID)
    }
}