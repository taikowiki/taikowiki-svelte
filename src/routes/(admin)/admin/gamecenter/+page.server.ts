import { Gamecenter } from "$lib/module/gamecenter";
import '$lib/module/gamecenter/gamecenter.server.js';

export async function load(){
    return {
        gamecenterDatas: await Gamecenter.Server.DBController.getAllNames()
    }
}