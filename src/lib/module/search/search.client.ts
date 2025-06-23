import { defineRequestHandler } from "@yowza/rrequestor";
import { Search } from ".";

namespace SearchClient {
    export const request = {
        song,
        doc,
        all
    }

    async function song(keyword: string) {
        const url = new URL(location.href);
        url.pathname = '/api/search/song';
        url.searchParams.set('keyword', keyword);

        const requestHandler = defineRequestHandler<null, Search.Result[]>({
            url: url.href,
            method: 'get'
        });

        return await requestHandler(null);
    }

    async function doc(keyword: string) {
        const url = new URL(location.href);
        url.pathname = '/api/search/doc';
        url.searchParams.set('keyword', keyword);

        const requestHandler = defineRequestHandler<null, Search.Result[]>({
            url: url.href,
            method: 'get'
        });

        return await requestHandler(null);
    }

    async function all(keyword: string) {
        const url = new URL(location.href);
        url.pathname = '/api/search/all';
        url.searchParams.set('keyword', keyword);

        const requestHandler = defineRequestHandler<null, Search.Result[]>({
            url: url.href,
            method: 'get'
        });

        return await requestHandler(null);
    }
}

Search.Client = SearchClient;