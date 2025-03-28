import type { SearchResult } from '$lib/module/common/search/types.js';
import { songDBController } from '$lib/module/common/song/song.server.js';
import { sqlEscapeString } from '$lib/module/common/util';
import { docDBController } from '$lib/module/common/wikidoc/server/dbController.server';
import { error } from '@sveltejs/kit';
import { runQuery } from "@yowza/db-handler"

export async function GET({ request }) {
    const keyword = new URL(request.url).searchParams.get('keyword');
    if (!keyword) {
        throw error(400, JSON.stringify({
            reason: 'No Keyword'
        }))
    }

    const searchResults = await runQuery(async (run) => {
        //@ts-expect-error
        const songResults = (await songDBController.searchColumns.getCallback(1, ['title', 'songNo'], { query: keyword }) as { songs: { title: string; songNo: string; }[]; count: number; })(run).map(({ title, songNo }) => {
            return {
                title,
                type: 'song',
                songNo
            }
        });

        const docResults = (await docDBController.getColumnsWhere.getCallback(["title"], [["title", `%${sqlEscapeString(keyword)}%`]])(run)).map(e => ({
            title: e.title as string,
            type: 'docs'
        }));

        return [...songResults, ...docResults] as SearchResult[];
    })

    return new Response(JSON.stringify(searchResults));
}