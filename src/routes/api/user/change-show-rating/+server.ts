import { userDBController } from '$lib/module/common/user/user.server.js';
import { error } from '@sveltejs/kit';

export async function POST({request, locals}){
    if(!locals.userData){
        throw error(401);
    }

    const requestData = await request.json();

    await userDBController.setShowRating(locals.userData.UUID, requestData);

    return new Response();
}