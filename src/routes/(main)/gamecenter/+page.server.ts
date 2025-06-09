import { Gamecenter } from "$lib/module/gamecenter";
import '$lib/module/gamecenter/gamecenter.server.js';

export async function load({ url }) {
    const gamecenterDatas = await Gamecenter.Server.DBController.getAll();
    return {
        gamecenterDatas
    }
}