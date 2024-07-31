import { songRequestDBController } from "$lib/module/common/song/song.server";

export async function load(){
    return {
        requests: await songRequestDBController.getAll("none")
    }
}