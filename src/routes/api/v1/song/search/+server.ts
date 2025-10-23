import { Song } from '$lib/module/song/song.server';
import { Util } from '$lib/module/util/util.server';
import { runQuery } from '@yowza/db-handler';
import type { RequestEvent } from './$types';
import type { Query } from '@yowza/db-handler/types';

const { queryBuilder } = Util.Server;

export async function GET({ url, setHeaders, locals }: RequestEvent) {
    const query = url.searchParams.get('query') || undefined;
    const difficulty = url.searchParams.get('difficulty') as (Song.Difficulty | "oniura") || undefined;
    const genre = url.searchParams.get('genre') as Song.Genre || undefined;
    let level: number | undefined = Number(url.searchParams.get('level'));
    if (isNaN(level) || level === 0) level = undefined;

    let sqlQuery = queryBuilder.select('song', ({ raw }) => ({
        songNo: 'songNo',
        genre: 'genre',
        title: 'title',
        titleKo: 'titleKo',
        aliasKo: 'aliasKo',
        titleEn: 'titleEn',
        aliasEn: 'aliasEn',
        artists: 'artists',
        romaji: 'romaji',
        easy: raw("JSON_EXTRACT(`courses`, '$.easy.level')"),
        normal: raw("JSON_EXTRACT(`courses`, '$.normal.level')"),
        hard: raw("JSON_EXTRACT(`courses`, '$.hard.level')"),
        oni: raw("JSON_EXTRACT(`courses`, '$.oni.level')"),
        ura: raw("JSON_UNQUOTE(JSON_EXTRACT(`courses`, '$.ura.level'))")
    }));

    const whereConditions: ((expr: any) => any)[] = [];
    if (query) {
        const likeQuery = `%${query.split(' ').map(e => Util.sqlEscapeString(e)).map(e => e.replaceAll('%', '\\%').replaceAll('_', '\\_')).join('%')}%`;
        whereConditions.push(({ or, like, column }) => or(
            like(column('title'), likeQuery),
            like(column('titleKo'), likeQuery),
            like(column('aliasKo'), likeQuery),
            like(column('titleEn'), likeQuery),
            like(column('aliasEn'), likeQuery),
            like(column('romaji'), likeQuery)
        ));
    }
    if (genre) {
        whereConditions.push(({ raw }) => raw(`JSON_CONTAINS(\`genre\`, '"${genre}"')`));
    }
    if (difficulty && level) {
        if (difficulty === "oniura") {
            whereConditions.push(({ raw }) => raw(`(JSON_EXTRACT(\`courses\`, '$.oni.level') = ${level} OR JSON_EXTRACT(\`courses\`, '$.ura.level') = ${level})`));
        }
        else {
            whereConditions.push(({ raw }) => raw(`JSON_EXTRACT(\`courses\`, '$.${difficulty}.level') = ${level}`));
        }
    }

    if (whereConditions.length > 0) {
        //@ts-expect-error
        sqlQuery = sqlQuery.where((expr) => [...whereConditions.map(c => {
            return c(expr);
        })]);
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