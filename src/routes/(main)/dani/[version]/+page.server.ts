import DaniDB from '$lib/module/common/dani/daniDB.server.js';
import SongDB from '$lib/module/common/song/song.server.js';
import type { SongDataPickedForDani } from '$lib/module/page/dani/types.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const daniData = await DaniDB.getByVersion(params.version);

    if (daniData === null) {
        throw error(404);
    }

    const songNos = new Set<string>();
    daniData.data.forEach(dani => {
        dani.songs.forEach(song => {
            songNos.add(song.songNo)
        })
    })
    const songDatas = await SongDB.getBySongNo<SongDataPickedForDani>([...songNos], ["songNo", "genre", "title", "courses"])

    return {
        daniData,
        songDatas
    }
}