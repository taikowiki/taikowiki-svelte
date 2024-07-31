import { songDBController, songRequestDBController } from "$lib/module/common/song/song.server";
import { userDBController } from "$lib/module/common/user/user.server";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const order = Number(params.order);
    if (isNaN(order)) {
        throw error(400);
    }

    const request = await songRequestDBController.getRequestByOrder(order);
    if (!request) {
        throw error(404);
    }

    const song = await songDBController.getSongBySongNo(request.songNo);

    const requestor = await userDBController.getNickname(request.UUID)

    return {
        request,
        song,
        requestor
    }
}