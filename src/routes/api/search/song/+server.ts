import type { SearchResult } from '$lib/module/common/search/types.js';
import { songDBController } from '$lib/module/common/song/song.server.js';
import { error } from '@sveltejs/kit';

export async function GET({ request }) {
    const keyword = new URL(request.url).searchParams.get('keyword');
    if (!keyword) {
        throw error(400, JSON.stringify({
            reason: 'No Keyword'
        }))
    }

    const searchResults = await songDBController.searchColumns(1, ['title', 'songNo'], { query: keyword }) as {songs: {title: string; songNo: string;}[]; count: number;};
    const responseData: SearchResult[] = searchResults.songs.map(({title, songNo}) => {
        return {
            title,
            type: 'song',
            songNo
        }
    });

    return new Response(JSON.stringify(responseData));
}