import { docDBController } from '$lib/module/common/wikidoc/server/dbController.server.js';
import { error } from '@sveltejs/kit';
import { runQuery } from '@yowza/db-handler';

export async function _searchDoc(keyword: string, run: any) {
    return docDBController.quickSearch.getCallback(keyword)(run)
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