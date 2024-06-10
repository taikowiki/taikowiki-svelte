import DiffchartDB from "$lib/module/common/diffchart/diffchart.server";
import SongDB from "$lib/module/common/song/song.server.js";
import type { SongDataPickedForDiffchart } from "$lib/module/page/diffchart/types.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const level = Number(params.level);

    if (isNaN(level)) {
        throw error(500);
    }

    const diffChart = await DiffchartDB.getClearByLevel(level);
    const songNos: string[] = [];
    diffChart.sections.forEach(section => {
        section.songs.forEach(song => {
            songNos.push(song.songNo);
        })
    })
    const songSearchResult = await SongDB.getBySongNo<SongDataPickedForDiffchart>(songNos, ["genre", "songNo", "title", "titleKo", "aliasKo"])

    return {
        diffChart,
        songs: songSearchResult
    }
}