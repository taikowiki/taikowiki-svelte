import DiffchartDB from "$lib/module/common/diffchart/diffchart.server";
import SongDB from "$lib/module/common/song/song.server.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const level = Number(params.level);

    if (isNaN(level)) {
        throw error(500);
    }

    const diffChart = await DiffchartDB.getClearByLevel(level);
    const songSearchResult = await SongDB.search(null, { difficulty: 'oniura', level })

    return {
        diffChart,
        songs: songSearchResult.songs
    }
}