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

    return new Response(JSON.stringify({
        currentRating: userDonderData.currentRating,
        currentExp: userDonderData.currentExp,
        ratingData: loadAll ? userDonderData.ratingData : userDonderData.ratingData.slice(0, 50)
    }))
}