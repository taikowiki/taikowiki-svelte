import { GamecenterServer } from '$lib/module/gamecenter/gamecenter.server.js';

export async function load({ url }) {
    const gamecenterDatas = await GamecenterServer.DBController.getAll();
    return {
        gamecenterDatas
    }
}