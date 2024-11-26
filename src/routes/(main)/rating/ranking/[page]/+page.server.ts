import { getTier } from "$lib/module/common/user/getTier.js";
import { userDonderDBController } from "$lib/module/common/user/user.server";
import { error } from "@sveltejs/kit";

export async function load({params}){
    const page = Number(params.page);
    if(isNaN(page)){
        throw error(404);
    }

    const rankings = await userDonderDBController.getRanking(page);
    const count = await userDonderDBController.count();

    const refinedRankings = rankings.map((e) => {
        const data = {
            UUID: e.UUID,
            currentRating: e.currentRating,
            donder: {
                nickname: e.donder.nickname,
                taikoNumber: e.donder.taikoNumber
            } as {nickname: string; taikoNumber: number | null},
            tier: getTier(e.currentRating)
        }
        
        if(!e.showRatingNickname){
            data.donder.nickname = '???';
        }
        if(!e.showRatingTaikoNo){
            data.donder.taikoNumber = null;
        }

        return data;
    })

    return{
        rankings: refinedRankings,
        count
    }
}