import SongDB from "$lib/module/common/song/song.server";
import type { SongRequest } from "$lib/module/common/song/types.js";
import UserController from "$lib/module/common/user/user-controller.server.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    let requests = (await SongDB.getRequests(params.songNo, params.order) as any[]).map(request => {
        request.data = JSON.parse(request.data);
        return request;
    }) as (SongRequest & {order:number})[];

    const request = requests[0] ?? null;
    if(request === null){
        throw error(404);
    }

    return {
        request,
        requester: await UserController.getNickname(request.UUID)
    }
}