import SongDB from "$lib/module/common/song/song.server";
import type { Difficulty, Genre } from "$lib/module/common/song/types.js";
import type { SongDataPickedForSearch } from "$lib/module/page/song/types.js";

export async function load({ url }) {
    let page = Number(url.searchParams.get("page")) || 1;
    if (isNaN(page) || page === 0) page = 1;

    const query = url.searchParams.get('query') || undefined;
    const difficulty = url.searchParams.get('difficulty') as Difficulty || undefined;
    const genre = url.searchParams.get('genre') as Genre || undefined;

    let level: number | undefined = Number(url.searchParams.get('level'));
    if (isNaN(level) || level === 0) level = undefined;

    const songSearchResult = await SongDB.search<SongDataPickedForSearch>(page, { query, difficulty, genre, level }, ["order", "songNo", "genre", "title", "titleKo", "aliasKo", "artists", "courses"]);

    return {
        songs: songSearchResult.songs,
        count: songSearchResult.count,
        pageNum: page,
        option: {
            query,
            difficulty,
            genre,
            level
        }
    }
}