import { User } from "$lib/module/user";
import '$lib/module/user/user.client';
import { error } from '@sveltejs/kit';

export async function POST({request, locals}){
    if(!locals.userData){
        throw error(401);
    }

    const requestData = await request.json();

    await User.Server.DBController.setShowRating(locals.userData.UUID, requestData);

    return new Response();
}