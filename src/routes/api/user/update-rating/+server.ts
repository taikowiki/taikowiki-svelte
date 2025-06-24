import { User } from "$lib/module/user";
import '$lib/module/user/user.client';
import { error } from '@sveltejs/kit';

export async function POST({request, locals}){
    if(!locals.userData){
        throw error(403);
    }

    const requestData: {rating: number, exp:number, ratingData: User.DonderData['ratingData']} = await request.json();

    await User.Server.donderDBController.updateCurrentRating(locals.userData.UUID, requestData.rating, requestData.exp, requestData.ratingData);

    return new Response(JSON.stringify(
        await User.Server.donderDBController.getRankByRating(locals.userData.UUID)
    ))
}