import { defineRequestHandler } from "@yowza/rrequestor";
import type { SongData } from "./types";

export const songRequestor = {
    submitSong: defineRequestHandler<{songNo: string, songData: SongData}, void>({
        url: '/api/song/request',
        method: 'post'
    })
}