import SongDB from "$lib/module/common/song/song.server";
import type { SongRequest } from "$lib/module/common/song/types.js";

export async function load({ params }) {
    let requests = (await SongDB.getRequests(params.songNo) as any[]).map(request => {
        request.data = JSON.parse(request.data);
        return request;
    }) as (SongRequest & {order:number})[];
    return {
        requests
    }
}