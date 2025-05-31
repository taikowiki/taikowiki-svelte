import { GamecenterServer } from '$lib/module/gamecenter/gamecenter.server.js';

export async function load(){
    return {
        gamecenterDatas: await GamecenterServer.DBController.getAllNames()
    }
}