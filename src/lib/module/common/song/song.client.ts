import { defineRequestHandler } from "@yowza/rrequestor";
import type { SongData } from "./types";

export const songRequestor = {
    submitSong: defineRequestHandler<{ songNo: string, songData: SongData }, void>({
        url: '/api/song/request',
        method: 'post'
    })
}

export const songAdminRequestor = {
    uploadSong: defineRequestHandler<{ songNo: string, songData: Partial<SongData> }, void>({
        url: "/admin/api/song/upload",
        method: 'post'
    }),
    disapproveRequest: defineRequestHandler<{order: number[]}, void>({
        url: "/admin/api/song/disapprove",
        method: 'post'
    }),
    approve: defineRequestHandler<{order: number, songData: SongData}, void>({
        url: "/admin/api/song/approve",
        method: 'post'
    })
}