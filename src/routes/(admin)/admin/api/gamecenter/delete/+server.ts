import { Gamecenter } from "$lib/module/gamecenter";
import '$lib/module/gamecenter/gamecenter.server.js';
import { error } from "@sveltejs/kit";

export async function POST({request}){
    const requestData = await request.json();
    
    if(!("order" in requestData) && typeof(requestData.order) !== "number"){
        throw error(400);
    }

    await Gamecenter.Server.DBController.deleteGamecenter(requestData.order);

    return new Response();
}