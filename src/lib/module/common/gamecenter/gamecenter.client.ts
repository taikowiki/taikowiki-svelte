import { defineRequestHandler } from "@yowza/rrequestor";
import type { GameCenterDataWithoutOrder } from "./types";

const gamecenterRequestor = {
    /**
     * 즐겨찾기를 가져옵니다.
     */
    getFavorites: defineRequestHandler<null, number[]>({
        method: 'get',
        url: '/api/gamecenter/favorite'
    }),
    /**
     * 즐겨찾기 추가를 요청합니다.
     */
    addFavorite: defineRequestHandler<{gamecenterOrder: number}, void>({
        method: 'post',
        url: '/api/gamecenter/add-favorite'
    }),
    /**
     * 즐겨찾기 삭제를 요청합니다.
     */
    deleteFavorite: defineRequestHandler<{gamecenterOrder: number}, void>({
        method: 'post',
        url: '/api/gamecenter/delete-favorite'
    }),
    /**
     * 오락실 제보를 요청합니다.
     */
    report: defineRequestHandler<{gamecenterData: GameCenterDataWithoutOrder}, void>({
        method: 'post',
        url: '/api/gamecenter/report'
    })
}

const gamecenterAdminRequestor = {
    /**
     * 오락실 데이터를 수정합니다.
     */
    edit: defineRequestHandler<{gamecenterData: GameCenterDataWithoutOrder}, void>({
        method: 'post',
        url: '/admin/api/gamecenter/edit'
    }),
    /**
     * 오락실 데이터를 삭제합니다.
     */
    delete: defineRequestHandler<{order: number}, void>({
        method: 'post',
        url: '/admin/api/gamecenter/delete'
    }),
    /**
     * 오락실 데이터를 추가합니다.
     */
    add: defineRequestHandler<{gamecenterData: GameCenterDataWithoutOrder}, void>({
        method: 'post',
        url: '/admin/api/gamecenter/add'
    }),
    /**
     * 오락실 제보를 승인합니다.
     */
    approve: defineRequestHandler<{order:number}, void>({
        method: 'post',
        url: '/admin/api/gamecenter/approve'
    }),
    /**
     * 오락실 제보를 거절합니다.
     */
    disapprove: defineRequestHandler<{order:number}, void>({
        method: 'post',
        url: '/admin/api/gamecenter/disapprove'
    })
}

export {
    gamecenterRequestor,
    gamecenterAdminRequestor
}