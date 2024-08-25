import { daniDBController } from '$lib/module/common/dani/dani.server';
import { songDBController } from '$lib/module/common/song/song.server';
import type { SongDataPickedForDani } from '$lib/module/common/dani/types';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const daniData = await daniDBController.getByVersion(params.version);

    if (daniData === null) {
        throw error(404);
    }

    const songNos = new Set<string>();
    if (!daniData) {
        throw error(404);
    }

    daniData.data.forEach(dani => {
        dani.songs.forEach(song => {
            if(typeof(song.songNo) === "string"){
                songNos.add(song.songNo)
            }
        })
    });
    
    const songDatas = await songDBController.getSongsColumnsBySongNo([...songNos], ["songNo", "genre", "title", "courses"]) as SongDataPickedForDani[]

    return {
        daniData,
        songDatas
    }
}