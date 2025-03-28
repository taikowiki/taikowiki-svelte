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

export async function mainpageDocSearch(keyword: string){
    const url = new URL(location.href);
    url.pathname = '/api/search/doc';
    url.searchParams.set('keyword', keyword);

    const requestHandler = defineRequestHandler<null, SearchResult[]>({
        url: url.href,
        method: 'get'
    });

    return await requestHandler(null);
}

export async function mainpageAllSearch(keyword: string){
    const results = await Promise.all([mainpageSongSearch(keyword), mainpageDocSearch(keyword)]);

    const r = []

    if(results[0].status === "success"){
        r.push(...results[0].data)
    }
    if(results[1].status === "success"){
        r.push(...results[1].data);
    }

    return r;
}