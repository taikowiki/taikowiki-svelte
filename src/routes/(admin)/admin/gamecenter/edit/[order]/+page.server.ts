import { GamecenterController } from "$lib/module/page/gamecenter/gamecenter.server";
import { error } from "@sveltejs/kit";

export async function load({params}){
    const gamecenterData = await GamecenterController.getByOrder(Number(params.order))
    if(!gamecenterData){
        throw error(404);
    }
    return {
        gamecenterData
    }
}