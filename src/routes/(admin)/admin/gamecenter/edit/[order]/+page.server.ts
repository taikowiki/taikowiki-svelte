import { GamecenterServer } from '$lib/module/gamecenter/gamecenter.server.js';
import { error } from "@sveltejs/kit";

export async function load({params}){
    const gamecenterData = await GamecenterServer.DBController.getByOrder(Number(params.order))
    if(!gamecenterData){
        throw error(404);
    }
    return {
        gamecenterData
    }
}