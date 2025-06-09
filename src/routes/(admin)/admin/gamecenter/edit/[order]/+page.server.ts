import { Gamecenter } from "$lib/module/gamecenter";
import '$lib/module/gamecenter/gamecenter.server.js';
import { error } from "@sveltejs/kit";

export async function load({params}){
    const gamecenterData = await Gamecenter.Server.DBController.getByOrder(Number(params.order))
    if(!gamecenterData){
        throw error(404);
    }
    return {
        gamecenterData
    }
}