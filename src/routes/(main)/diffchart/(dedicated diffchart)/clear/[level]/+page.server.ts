import { diffchartDBController } from "$lib/module/common/diffchart/diffchart.server";
import { userDonderDBController } from "$lib/module/common/user/user.server";
import { songDBController } from "$lib/module/common/song/song.server";
import type { SongDataPickedForDiffchart } from "$lib/module/common/diffchart/types";
import { error } from "@sveltejs/kit";

export async function load({ params, locals }) {
    const level = Number(params.level);

    if (isNaN(level)) {
        throw error(500);
    }

    const diffChart = await diffchartDBController.getClearByLevel(level);
    if (!diffChart) {
        throw error(404);
    }

    const songNos: string[] = [];
    diffChart.sections.forEach(section => {
        section.songs.forEach(song => {
            songNos.push(song.songNo);
        })
    })
    const songSearchResult = await songDBController.getSongsColumnsBySongNo(songNos, ["genre", "songNo", "title", "titleKo", "aliasKo"]) as SongDataPickedForDiffchart[]
    
    let donderDataResult = null;
    if(locals.userData !== null) {
        donderDataResult = await userDonderDBController.getData(locals.userData.UUID);
    }

    return {
        diffChart,
        songs: songSearchResult,
        donderData : donderDataResult,
    }
}