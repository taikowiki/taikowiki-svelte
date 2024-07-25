import { GamecenterController } from "$lib/module/page/gamecenter/gamecenter.server";

export async function load(){
    return {
        gamecenterDatas: await GamecenterController.getAllNames()
    }
}