import { Gamecenter } from "$lib/module/gamecenter";
import '$lib/module/gamecenter/gamecenter.server.js';

export async function load(){
    return {
        reports: await Gamecenter.Server.DBController.getReports('none')
    }
}