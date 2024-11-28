import type { UserDonderData, UserScoreData } from '$lib/module/common/user/types.js';
import { userDonderDBController } from '$lib/module/common/user/user.server.js';
import { error } from '@sveltejs/kit';

export async function load({ params, locals }) {
    const { UUID } = params;
    
    const donderData = await userDonderDBController.getUserRating(UUID);
    if(!donderData || !donderData.currentRating || !donderData.ratingData || !donderData.scoreData){
        throw error(404);
    }

    if(locals.userData && locals.userData.grade >= 10){
        var refinedData: RefinedData = {
            UUID: donderData.UUID,
            currentRating: donderData.currentRating,
            currentExp: donderData.currentExp,
            nickname: donderData.donder.nickname,
            taikoNumber: donderData.donder.taikoNumber,
            ratingData: donderData.ratingData.slice(0, 50),
            scoreData: donderData.scoreData
        }
    }
    else{
        var refinedData: RefinedData = {
            UUID: donderData.UUID,
            currentRating: donderData.currentRating,
            currentExp: donderData.currentExp,
            nickname: donderData.showRatingNickname ? donderData.donder.nickname : null,
            taikoNumber: donderData.showRatingTaikoNo ? donderData.donder.taikoNumber : null,
            ratingData: donderData.showRatingSongs ? donderData.ratingData.slice(0, 50) : null,
            scoreData: donderData.showRatingSongs ? donderData.scoreData : null
        }
    }

    return {
        otherDonderData: refinedData
    }
}

interface RefinedData{
    UUID: string,
    currentRating: number,
    currentExp: number | null,
    nickname: string | null,
    taikoNumber: number | null,
    ratingData: UserDonderData['ratingData'],
    scoreData: UserScoreData | null
}