import { songDBController } from '$lib/module/common/song/song.server';

export async function load({ params }) {
    return {
        song: await songDBController.getSongBySongNo(params.songNo)
    }
}