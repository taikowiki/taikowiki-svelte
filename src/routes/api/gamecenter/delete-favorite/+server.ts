import { GamecenterController } from '$lib/module/common/gamecenter/gamecenter.server.js';
import { error } from '@sveltejs/kit';

export async function POST({request, locals}){
    const data = await request.json();

    if(!("gamecenterOrder" in data) || typeof(data.gamecenterOrder) !== "number"){
        throw error(400);
    }

    const userData = locals.userData;
    if(!userData){
        throw error(403);
    }

    await GamecenterController.deleteFavorite(userData.UUID, data.gamecenterOrder);

    return new Response();
}