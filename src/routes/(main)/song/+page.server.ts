import { Song } from '$lib/module/song/song.server';

export async function load({ url }) {
    let page = Number(url.searchParams.get("page")) || 1;
    if (isNaN(page) || page === 0) page = 1;

    const query = url.searchParams.get('query') || undefined;
    const difficulty = url.searchParams.get('difficulty') as Song.Difficulty || undefined;
    const genre = url.searchParams.get('genre') as Song.Genre || undefined;

    let level: number | undefined = Number(url.searchParams.get('level'));
    if (isNaN(level) || level === 0) level = undefined;

    const songSearchResult = await Song.Server.DBController.searchColumns(page, ["order", "songNo", "genre", "title", "titleKo", "aliasKo", "titleEn", "aliasEn", "artists", "courses", "romaji"], { query, difficulty, genre, level });

    return {
        songs: songSearchResult.songs as Song.SongDataPickedForSearch[],
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