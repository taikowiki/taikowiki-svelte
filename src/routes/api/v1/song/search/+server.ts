import { Song } from '$lib/module/song/song.server';
import { Util } from '$lib/module/util';
import { QB, queryBuilder, runQuery, Select, Where } from '@yowza/db-handler';

export async function GET({ url, setHeaders, locals }) {
    const query = url.searchParams.get('query') || undefined;
    const difficulty = url.searchParams.get('difficulty') as (Song.Difficulty | "oniura") || undefined;
    const genre = url.searchParams.get('genre') as Song.Genre || undefined;
    let level: number | undefined = Number(url.searchParams.get('level'));
    if (isNaN(level) || level === 0) level = undefined;

    let sqlQuery: QB = queryBuilder.select('song', [
        "songNo",
        "genre",
        "title",
        "titleKo",
        "aliasKo",
        "titleEn",
        "aliasEn",
        "artists",
        "romaji",
        Select.As(Select.Raw("JSON_EXTRACT(`courses`, '$.easy.level')"), 'easy'),
        Select.As(Select.Raw("JSON_EXTRACT(`courses`, '$.normal.level')"), 'normal'),
        Select.As(Select.Raw("JSON_EXTRACT(`courses`, '$.hard.level')"), 'hard'),
        Select.As(Select.Raw("JSON_EXTRACT(`courses`, '$.oni.level')"), 'oni'),
        Select.As(Select.Raw("JSON_UNQUOTE(JSON_EXTRACT(`courses`, '$.ura.level'))"), 'ura')
    ]);

    const whereConditions: any[] = [];
    if (query) {
        const whereClause = `%${query.split(' ').map(e => Util.sqlEscapeString(e)).map(e => e.replaceAll('%', '\\%').replaceAll('_', '\\_')).join('%')}%`;
        whereConditions.push(Where.OR(
            Where.Like('title', whereClause),
            Where.Like('titleKo', whereClause),
            Where.Like('aliasKo', whereClause),
            Where.Like('titleEn', whereClause),
            Where.Like('aliasEn', whereClause),
            Where.Like('romaji', whereClause)
        ));
    }
    if (genre) {
        whereConditions.push(Where.Raw(`JSON_CONTAINS(\`genre\`, '"${genre}"')`))
    }
    if (difficulty && level) {
        if (difficulty === "oniura") {
            whereConditions.push(Where.Raw(`(JSON_EXTRACT(\`courses\`, '$.oni.level') = ${level} OR JSON_EXTRACT(\`courses\`, '$.ura.level') = ${level})`));
        }
        else {
            whereConditions.push(Where.Raw(`JSON_EXTRACT(\`courses\`, '$.${difficulty}.level') = ${level}`));
        }
    }

    if (whereConditions.length > 0) {
        sqlQuery = (sqlQuery as Select).where(...whereConditions);
    }

    const result = await runQuery(async (run) => {
        return await run(sqlQuery.build());
    })

    result.forEach((e: any) => Song.Server.parseSongDataFromDB(e));

    setHeaders({
        ...locals.headers,
        'Content-Type': 'application/json'
    })

    return new Response(JSON.stringify(result.map((e: any) => ({
        songNo: e.songNo,
        title: e.title,
        titleKo: e.titleKo,
        aliasKo: e.aliasKo,
        titleEn: e.titleEn,
        aliasEn: e.aliasEn,
        romaji: e.romaji,
        artists: e.artists,
        genre: e.genre,
        level: {
            easy: e.easy,
            normal: e.normal,
            hard: e.hard,
            oni: e.oni,
            ura: e.ura
        }
    }))));
}