import { gamecenterDBController } from '$lib/module/common/gamecenter/gamecenter.server.js';
import { error } from '@sveltejs/kit';

export async function POST({request}){
    const requestData = await request.json();
    const order = requestData.order;

    if(typeof(order) !== "number"){
        throw error(400);
    }

    await gamecenterDBController.approveRequest(order);

    return new Response();
}