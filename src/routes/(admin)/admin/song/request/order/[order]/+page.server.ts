import { Song } from '$lib/module/song/song.server';
import { User } from "$lib/module/user";
import '$lib/module/user/user.server';
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const order = Number(params.order);
    if (isNaN(order)) {
        throw error(400);
    }

    const request = await Song.Server.reqDBController.getRequestByOrder(order);
    if (!request) {
        throw error(404);
    }

    const song = await Song.Server.DBController.getSongBySongNo(request.songNo);

    const requestor = await User.Server.DBController.getNickname(request.UUID)

    return {
        request,
        song,
        requestor
    }
}