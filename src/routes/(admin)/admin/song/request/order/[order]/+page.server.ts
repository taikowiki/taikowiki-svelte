import { songDBController, songRequestDBController } from "$lib/module/common/song/song.server";
import { User } from "$lib/module/user";
import '$lib/module/user/user.client';
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

    const requestor = await User.Server.DBController.getNickname(request.UUID)

    return {
        request,
        song,
        requestor
    }
}