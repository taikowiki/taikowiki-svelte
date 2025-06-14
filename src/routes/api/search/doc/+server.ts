import { error } from '@sveltejs/kit';
import { runQuery } from '@yowza/db-handler';
import { Doc } from "$lib/module/doc/doc.server";

export async function _searchDoc(keyword: string, run: any) {
    return Doc.Server.DBController.quickSearch.getCallback(keyword)(run)
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