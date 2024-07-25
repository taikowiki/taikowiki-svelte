import { defineRequestHandler } from "@yowza/rrequestor";
import type { GameCenterDataWithoutOrder } from "./types";

const gamecenterRequestor = {
    /**
     * 즐겨찾기 가져오기
     */
    getFavorites: defineRequestHandler<null, number[]>({
        method: 'get',
        url: '/api/gamecenter/favorite'
    }),
    /**
     * 즐겨찾기 추가 요청
     */
    addFavorite: defineRequestHandler<{gamecenterOrder: number}, void>({
        method: 'post',
        url: '/api/gamecenter/add-favorite'
    }),
    deleteFavorite: defineRequestHandler<{gamecenterOrder: number}, void>({
        method: 'post',
        url: '/api/gamecenter/delete-favorite'
    }),
    /**
     * 제보
     */
    report: defineRequestHandler<{gamecenterData: GameCenterDataWithoutOrder}, void>({
        method: 'post',
        url: '/api/gamecenter/report'
    })
}

export {
    gamecenterRequestor
}