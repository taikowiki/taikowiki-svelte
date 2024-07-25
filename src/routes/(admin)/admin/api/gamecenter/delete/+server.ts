import { GamecenterController } from "$lib/module/page/gamecenter/gamecenter.server";
import { error } from "@sveltejs/kit";

export async function POST({request}){
    const requestData = await request.json();
    
    if(!("order" in requestData) && typeof(requestData.order) !== "number"){
        throw error(400);
    }

    await GamecenterController.deleteGamecenter(requestData.order);

    return new Response();
}