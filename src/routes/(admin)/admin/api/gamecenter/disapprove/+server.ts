import { GamecenterController } from '$lib/module/page/gamecenter/gamecenter.server.js';
import { error } from '@sveltejs/kit';

export async function POST({request}){
    const requestData = await request.json();
    const order = requestData.order;

    if(typeof(order) !== "number"){
        throw error(400);
    }

    await GamecenterController.disapproveRequest(order);

    return new Response();
}