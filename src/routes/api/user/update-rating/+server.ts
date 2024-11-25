import type { UserDonderData } from '$lib/module/common/user/types.js';
import { userDonderDBController } from '$lib/module/common/user/user.server.js';
import { error } from '@sveltejs/kit';

export async function POST({request, locals}){
    if(!locals.userData){
        throw error(403);
    }

    const requestData: {rating: number, exp:number, ratingData: UserDonderData['ratingData']} = await request.json();

    await userDonderDBController.updateCurrentRating(locals.userData.UUID, requestData.rating, requestData.exp, requestData.ratingData);

    return new Response(JSON.stringify(
        await userDonderDBController.getRankByRating(locals.userData.UUID)
    ))
}