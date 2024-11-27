import { defineRequestHandler } from "@yowza/rrequestor";
import type { UserDonderData } from "./types";

export const userRequestor = {
    changeNickname: defineRequestHandler<{ newNickname: string }, string>({
        "url": "/api/user/change-nickname",
        method: "post"
    }),
    getUserData: defineRequestHandler<null, any>({
        url: "/api/user",
        method: 'get'
    }),
    changeShowRating: defineRequestHandler<{nickname?: boolean; taikoNumber?: boolean; songs?: boolean}, void>({
        url: '/api/user/change-show-rating',
        method: 'post'
    })
}

export const userDonderRequestor = {
    updateRating: defineRequestHandler<{rating: number, exp: number, ratingData: UserDonderData['ratingData']}, {count: number, ranking: number}>({
        url: '/api/user/update-rating',
        method: 'post'
    }),
    getRanking: defineRequestHandler<null, {count: number, ranking: number}>({
        url: '/api/user/ranking',
        method: 'get'
    })
}

export const userAdminRequestor = {
    setGrade: defineRequestHandler<{ UUID: string, from: number, to: number }, void>(
        {
            url: "/admin/api/user/set_grade",
            method: "post"
        }
    )
}