import { userDonderDBController } from '$lib/module/common/user/user.server.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const { UUID } = params;
    
    const donderData = await userDonderDBController.getUserRating(UUID);
    if(!donderData || !donderData.currentRating || !donderData.ratingData || !donderData.scoreData){
        throw error(404);
    }

    const refinedData = {
        UUID: donderData.UUID,
        currentRating: donderData.currentRating,
        currentExp: donderData.currentExp,
        nickname: donderData.showRatingNickname ? donderData.donder.nickname : null,
        taikoNumber: donderData.showRatingTaikoNo ? donderData.donder.taikoNumber : null,
        ratingData: donderData.showRatingSongs ? donderData.ratingData.slice(0, 50) : null,
        scoreData: donderData.showRatingSongs ? donderData.scoreData : null
    }

    return {
        otherDonderData: refinedData
    }
}