import type { SearchResult } from '$lib/module/common/search/types.js';
import { sqlEscapeLike } from '$lib/module/common/util.js';
import { error } from '@sveltejs/kit';
import { queryBuilder, runQuery, Where } from '@yowza/db-handler';

export async function _searchDoc(keyword: string, run: any) {
    const query = queryBuilder.select('docs', ['title']).where(Where.Like('title', `%${keyword.split(' ').map(e => sqlEscapeLike(e)).join('%')}%`)).limit(20).build()

    const searchResult: SearchResult[] = (await run(query)).map((e: any) => ({
        title: e.title as string,
        type: 'docs'
    }));

    return searchResult;
}

export async function GET({ url }) {
    const keyword = url.searchParams.get('keyword');
    if (!keyword) {
        throw error(400, JSON.stringify({
            reason: 'No Keyword'
        }));
    }

    const searchResult = await runQuery(async(run) => {
        return await _searchDoc(keyword, run)
    })

    return new Response(JSON.stringify(searchResult));
}