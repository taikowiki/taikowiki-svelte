import { songDBController } from "$lib/module/common/song/song.server.js";
import type { SongData } from "$lib/module/common/song/types.js";
import { userDonderDBController } from "$lib/module/common/user/user.server";

export async function load({ locals }) {
    const songDatas = (await songDBController.getAllColumns(['title', 'songNo', 'genre', 'courses'])) as Pick<SongData, 'songNo' | 'title' | 'genre' | 'courses'>[];

    if (locals.userData) {
        const donderData = await userDonderDBController.getData(locals.userData.UUID);
        if(donderData && donderData.scoreData){
            const ranking = await userDonderDBController.getRankByRating(locals.userData.UUID);
            return {
                ratingDataExists: true,
                donderData,
                songDatas,
                ranking,
                logined: true
            }
        }
        else{
            return {
                ratingDataExists: false,
                donderData: null,
                songDatas,
                ranking: null,
                logined: true
            }
        }
    }
    return {
        ratingDataExists: false,
        donderData: null,
        songDatas,
        ranking: null,
        logined: false
    }
}

export const ssr = false;