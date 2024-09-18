import { diffchartDBController } from "$lib/module/common/diffchart/diffchart.server";
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

    const songNos = diffChart.sections.flatMap((section) => section.songs.map((song) => song.songNo))
    const songSearchResult = await songDBController.getSongsColumnsBySongNo(songNos, ["genre", "songNo", "title", "titleKo", "aliasKo"]) as SongDataPickedForDiffchart[]
    return {
        diffChart,
        songs: songSearchResult
    }
}