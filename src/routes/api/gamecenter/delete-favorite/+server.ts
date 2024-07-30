import { gamecenterDBController } from '$lib/module/common/gamecenter/gamecenter.server.js';
import { error } from '@sveltejs/kit';

export async function POST({request, locals}){
    const data = await request.json();

    if(!("gamecenterOrder" in data) || typeof(data.gamecenterOrder) !== "number"){
        throw error(400);
    }

    const userData = locals.userData;
    if(!userData){
        throw error(401);
    }

    await gamecenterDBController.deleteFavorite(userData.UUID, data.gamecenterOrder);

    return new Response();
}