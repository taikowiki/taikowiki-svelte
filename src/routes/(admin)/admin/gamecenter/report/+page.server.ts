import { gamecenterDBController } from "$lib/module/common/gamecenter/gamecenter.server";

export async function load(){
    return {
        reports: await gamecenterDBController.getReports('none')
    }
}