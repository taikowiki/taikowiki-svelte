import { error } from '@sveltejs/kit';
import { runQuery } from "@yowza/db-handler"
import { _searchDoc } from '../doc/+server.js';
import { _searchSong } from '../song/+server.js';

export async function GET({ request }) {
    const keyword = new URL(request.url).searchParams.get('keyword');
    if (!keyword) {
        throw error(400, JSON.stringify({
            reason: 'No Keyword'
        }))
    }

    const searchResults = await runQuery(async (run) => {
        const r = await Promise.all([_searchSong(keyword, run), _searchDoc(keyword, run)]);
        return [...r[0], ...r[1]]
    })

    return new Response(JSON.stringify(searchResults));
}