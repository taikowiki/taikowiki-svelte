import { GamecenterController } from '$lib/module/page/gamecenter/gamecenter.server.js';
import { error } from '@sveltejs/kit';

export async function GET({locals}){
    const userData = locals.userData;

    if(!userData){
        throw error(401);
    }

    return new Response(JSON.stringify(await GamecenterController.getFavorites(userData.UUID)), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}