import { userDonderDBController } from '$lib/module/common/user/user.server.js';
import { error } from '@sveltejs/kit';

export async function load({ params, locals }) {
    const { UUID } = params;
    
    const donderData = await userDonderDBController.getUserRating(UUID);
    if(!donderData || !donderData.currentRating || !donderData.ratingData || !donderData.scoreData){
        throw error(404);
    }
    
    const refinedData = {
        UUID: donderData.UUID,
        currentRating: donderData.currentRating,
        currentExp: donderData.currentExp,
        nickname: donderData.showRatingNickname || isGrade10(locals) ? donderData.donder.nickname : null,
        taikoNumber: donderData.showRatingTaikoNo || isGrade10(locals) ? donderData.donder.taikoNumber : null,
        ratingData: donderData.showRatingSongs || isGrade10(locals) ? donderData.ratingData.slice(0, 50) : null,
        scoreData: donderData.showRatingSongs || isGrade10(locals) ? donderData.scoreData : null
    }

    return {
        otherDonderData: refinedData
    }
}

function isGrade10(locals: App.Locals){
    if(!locals.userData) return false;
    if(locals.userData.grade < 10) return false;
    return true;
}