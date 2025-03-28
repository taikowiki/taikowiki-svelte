import type { SearchResult } from '$lib/module/common/search/types.js';
import { sqlEscapeString } from '$lib/module/common/util.js';
import { docDBController } from '$lib/module/common/wikidoc/server/dbController.server.js';
import { error } from '@sveltejs/kit';

export async function GET({ url }) {
    const keyword = url.searchParams.get('keyword');
    if (!keyword) {
        throw error(400, JSON.stringify({
            reason: 'No Keyword'
        }));
    }

    const searchResult: SearchResult[] = (await docDBController.getColumnsWhere(["title"], [["title", `%${sqlEscapeString(keyword)}%`]], 10)).map(e => ({
        title: e.title as string,
        type: 'docs'
    }));

    return new Response(JSON.stringify(searchResult));
}