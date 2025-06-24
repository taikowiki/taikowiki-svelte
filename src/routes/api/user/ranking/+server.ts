import { User } from "$lib/module/user";
import '$lib/module/user/user.client';
import { error } from '@sveltejs/kit';

export async function GET({locals}){
    if(!locals.userData){
        throw error(403);
    }

    return new Response(JSON.stringify(
        await User.Server.donderDBController.getRankByRating(locals.userData.UUID)
    ))
}