import { gamecenterDBController } from "$lib/module/common/gamecenter/gamecenter.server";
import { error } from "@sveltejs/kit";

export async function load({params}){
    const gamecenterData = await gamecenterDBController.getByOrder(Number(params.order))
    if(!gamecenterData){
        throw error(404);
    }
    return {
        gamecenterData
    }
}