import { GamecenterServer } from '$lib/module/gamecenter/gamecenter.server.js';
import { error } from '@sveltejs/kit';

export async function GET({locals}){
    const userData = locals.userData;

    if(!userData){
        throw error(401);
    }

    return new Response(JSON.stringify(await GamecenterServer.DBController.getFavorites(userData.UUID)), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}