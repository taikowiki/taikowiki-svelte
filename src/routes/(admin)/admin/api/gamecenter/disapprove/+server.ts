import { GamecenterServer } from '$lib/module/gamecenter/gamecenter.server.js';
import { error } from '@sveltejs/kit';

export async function POST({request}){
    const requestData = await request.json();
    const order = requestData.order;

    if(typeof(order) !== "number"){
        throw error(400);
    }

    await GamecenterServer.DBController.disapproveRequest(order);

    return new Response();
}