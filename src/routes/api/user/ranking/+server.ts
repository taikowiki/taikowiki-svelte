import { userDonderDBController } from '$lib/module/common/user/user.server.js';
import { error } from '@sveltejs/kit';

export async function GET({locals}){
    if(!locals.userData){
        throw error(403);
    }

    return new Response(JSON.stringify(
        await userDonderDBController.getRankByRating(locals.userData.UUID)
    ))
}