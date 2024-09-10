import { songDBController } from "$lib/module/common/song/song.server.js";
import type { SongData } from "$lib/module/common/song/types.js";
import { userDonderDBController } from "$lib/module/common/user/user.server";
import { error } from "@sveltejs/kit";

export const ssr = false;

export async function load({locals}){
    if(!locals.userData){
        throw error(403);
    }

    const donderData = await userDonderDBController.getData(locals.userData.UUID);
    const songDatas = (await songDBController.getAllColumns(['title', 'songNo', 'genre', 'courses'])) as Pick<SongData, 'songNo' | 'title' | 'genre' | 'courses'>[];

    return {
        donderData,
        songDatas
    }
}