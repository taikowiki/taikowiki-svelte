import { GamecenterServer } from '$lib/module/gamecenter/gamecenter.server.js';

export async function load(){
    return {
        reports: await GamecenterServer.DBController.getReports('none')
    }
}