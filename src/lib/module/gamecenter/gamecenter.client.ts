import { defineRequestHandler } from "@yowza/rrequestor";
import { Gamecenter } from ".";

export namespace GamecenterClient {
    export function getKakaoMap() {
        return window.kakao.maps;
    }
    
    export const request = {
        /**
        * Retrieves the list of favorites.
        */
        getFavorites: defineRequestHandler<null, number[]>({
            method: 'get',
            url: '/api/gamecenter/favorite'
        }),
        /**
         * Requests to add a favorite.
         */
        addFavorite: defineRequestHandler<{ gamecenterOrder: number }, void>({
            method: 'post',
            url: '/api/gamecenter/add-favorite'
        }),
        /**
         * Requests to delete a favorite.
         */
        deleteFavorite: defineRequestHandler<{ gamecenterOrder: number }, void>({
            method: 'post',
            url: '/api/gamecenter/delete-favorite'
        }),
        /**
         * Requests to report a game center.
         */
        report: defineRequestHandler<{ gamecenterData: Omit<Gamecenter.Gamecenter, 'order' | 'favoriteCount' | 'coor'> }, void>({
            method: 'post',
            url: '/api/gamecenter/report'
        })
    }

    export const adminRequest = {
        /**
         * Edits game center data.
         */
        edit: defineRequestHandler<{ gamecenterData: Gamecenter.GamecenterWithoutOrder }, void>({
            method: 'post',
            url: '/admin/api/gamecenter/edit'
        }),
        /**
         * Deletes game center data.
         */
        delete: defineRequestHandler<{ order: number }, void>({
            method: 'post',
            url: '/admin/api/gamecenter/delete'
        }),
        /**
         * Adds game center data.
         */
        add: defineRequestHandler<{ gamecenterData: Gamecenter.GamecenterWithoutOrder }, void>({
            method: 'post',
            url: '/admin/api/gamecenter/add'
        }),
        /**
         * Approves game center reports.
         */
        approve: defineRequestHandler<{ order: number }, void>({
            method: 'post',
            url: '/admin/api/gamecenter/approve'
        }),
        /**
         * Disapproves game center reports.
         */
        disapprove: defineRequestHandler<{ order: number }, void>({
            method: 'post',
            url: '/admin/api/gamecenter/disapprove'
        })
    }
}