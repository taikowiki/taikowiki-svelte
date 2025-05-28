import { diffchartDBController } from "$lib/module/diffchart/diffchart.server";
import { error } from "@sveltejs/kit";

export async function load({ params, locals }) {
    const level = Number(params.level);

    if (isNaN(level)) {
        throw error(500);
    }

    const diffChartData = await diffchartDBController.getClearByLevel(level);
    const diffChart = diffChartData?.data;
    if (!diffChart) {
        throw error(404);
    }

    /*
    const songNos = diffChart.sections.flatMap((section) => section.songs.map((song) => song.songNo))
    const songSearchResult = await songDBController.getSongsColumnsBySongNo(songNos, ["genre", "songNo", "title", "titleKo", "aliasKo"]) as SongDataPickedForDiffchart[]
    */
    return {
        diffChartData,
        //songs: songSearchResult
    }
}