import { defineRequestHandler } from "@yowza/rrequestor";
import type { SearchResult } from "./types";

export async function mainpageSongSearch(keyword: string) {
    const url = new URL(location.href);
    url.pathname = '/api/search/song';
    url.searchParams.set('keyword', keyword);

    const requestHandler = defineRequestHandler<null, SearchResult[]>({
        url: url.href,
        method: 'get'
    });

    return await requestHandler(null);
} 