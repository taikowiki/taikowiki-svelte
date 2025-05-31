import { GamecenterServer } from '$lib/module/gamecenter/gamecenter.server.js';
import { error } from "@sveltejs/kit";

export async function POST({request}){
    const requestData = await request.json();
    
    if(!("order" in requestData) && typeof(requestData.order) !== "number"){
        throw error(400);
    }

    await GamecenterServer.DBController.deleteGamecenter(requestData.order);

    return new Response();
}