import { userDonderDBController } from '$lib/module/common/user/user.server.js';
import { error } from '@sveltejs/kit';

export async function POST({request, locals}){
    if(!locals.userData){
        throw error(403);
    }

    const requestData: {rating: number} = await request.json();

    await userDonderDBController.updateCurrentRating(locals.userData.UUID, requestData.rating);

    return new Response(JSON.stringify(
        await userDonderDBController.getRankByRating(locals.userData.UUID)
    ))
}