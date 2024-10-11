import { gamecenterDBController } from "$lib/module/common/gamecenter/gamecenter.server"

export async function load({ url }) {
    const gamecenterDatas = await gamecenterDBController.getAll();
    return {
        gamecenterDatas
    }
}