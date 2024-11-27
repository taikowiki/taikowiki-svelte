import { userDonderDBController } from '$lib/module/common/user/user.server.js';
import { error } from '@sveltejs/kit';

export async function GET({locals, url}){
    if(!locals.userData){
        throw error(401);
    }

    const userDonderData = await userDonderDBController.getData(locals.userData.UUID);

    const loadAll = url.searchParams.get('all') === 'true';

    if(!userDonderData || !userDonderData.currentRating || !userDonderData.ratingData){
        throw error(404);
    }

    if(loadAll){
        var ratingDataWithScoreData = userDonderData.ratingData.map((e) => {
            const scoreData = userDonderData.scoreData?.[e.songNo]?.difficulty?.[e.difficulty];
            if(scoreData){
                return {
                    ...e,
                    scoreData
                }
            }
            else{
                return {
                    ...e,
                    scoreData: null
                }
            }
        })
    }
    else{
        var ratingDataWithScoreData = userDonderData.ratingData.slice(0, 50).map((e) => {
            const scoreData = userDonderData.scoreData?.[e.songNo]?.difficulty?.[e.difficulty];
            if(scoreData){
                return {
                    ...e,
                    scoreData
                }
            }
            else{
                return {
                    ...e,
                    scoreData: null
                }
            }
        })
    }

    return new Response(JSON.stringify({
        currentRating: userDonderData.currentRating,
        currentExp: userDonderData.currentExp,
        ratingDataWithScoreData
    }))
}