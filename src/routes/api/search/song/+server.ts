import { Util } from '$lib/module/util/util.server';
import type { Search } from '$lib/module/search/index.js';
import { error } from '@sveltejs/kit';
import { runQuery } from '@yowza/db-handler';
import type { RequestEvent } from './$types';

const { queryBuilder } = Util.Server;

export async function _searchSong(keyword: string, run: any) {
    const likeQuery = `%${keyword.split(' ').map(e => Util.sqlEscapeLike(e)).join('%')}%`
    const query = queryBuilder
        .select('song', () => ({ title: 'title', songNo: 'songNo' }))
        .where(({ or, column, like }) => [or(
            like(column('title'), likeQuery),
            like(column('titleKo'), likeQuery),
            like(column('aliasKo'), likeQuery),
            like(column('titleEn'), likeQuery),
            like(column('aliasEn'), likeQuery),
            like(column('romaji'), likeQuery),
        )])
        .limit(20)
        .build();

    const result = await run(query);
    const responseData: Search.Result[] = result.map(({ title, songNo }: any) => {
        return {
            title,
            type: 'song',
            songNo
        }
    });
    return responseData;
}

export async function GET({ request }: RequestEvent) {
    const keyword = new URL(request.url).searchParams.get('keyword');
    if (!keyword) {
        throw error(400, JSON.stringify({
            reason: 'No Keyword'
        }))
    }

    const responseData = await runQuery(async (run) => {
        return await _searchSong(keyword, run);
    })

    return new Response(JSON.stringify(responseData));
}