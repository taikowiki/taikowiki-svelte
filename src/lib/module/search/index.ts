import type { RResponse } from "@yowza/rrequestor/types";

export namespace Search{
    export declare namespace Client{
        const request: {
            song(keyword: string): Promise<RResponse<Search.Result[]>>;
            doc(keyword: string): Promise<RResponse<Search.Result[]>>;
            all(keyword: string): Promise<RResponse<Search.Result[]>>;
        }
    }
    function foo(){};
}

export namespace Search {
    export type SongResult = {
        title: string;
        type: 'song';
        songNo: string;
    }

    export type DocResult = {
        title: string;
        type: 'docs'
    }

    export type Result = SongResult | DocResult;
}