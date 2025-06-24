import { Song } from '$lib/module/song/song.server';

export async function load(){
    return {
        requests: await Song.Server.reqDBController.getAll("none")
    }
}