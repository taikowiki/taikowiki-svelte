import SongDB, { SongRequestController } from "$lib/module/common/song/song.server";

export async function load(){
    return {
        requests: await SongRequestController.getAll()
    }
}