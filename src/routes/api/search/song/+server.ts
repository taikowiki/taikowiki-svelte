import { sqlEscapeLike } from '$lib/module/common/util.js';
import type { Search } from '$lib/module/search/index.js';
import { error } from '@sveltejs/kit';
import { queryBuilder, runQuery, Where } from '@yowza/db-handler';

export async function _searchSong(keyword: string, run: any){
    const likeQuery = `%${keyword.split(' ').map(e => sqlEscapeLike(e)).join('%')}%`
    const query = queryBuilder.select('song', ['title', 'songNo']).where(Where.OR(
        Where.Like('title', likeQuery),
        Where.Like('titleKo', likeQuery),
        Where.Like('aliasKo', likeQuery),
        Where.Like('titleEn', likeQuery),
        Where.Like('aliasEn', likeQuery),
        Where.Like('romaji', likeQuery)
    )).limit(20).build();
    const result = await run(query);
    const responseData: Search.Result[] = result.map(({title, songNo}: any) => {
        return {
            title,
            type: 'song',
            songNo
        }
    });
    return responseData;
}

export async function GET({ request }) {
    const keyword = new URL(request.url).searchParams.get('keyword');
    if (!keyword) {
        throw error(400, JSON.stringify({
            reason: 'No Keyword'
        }))
    }

    const responseData = await runQuery(async(run) => {
        return await _searchSong(keyword, run);
    })

    return new Response(JSON.stringify(responseData));
}