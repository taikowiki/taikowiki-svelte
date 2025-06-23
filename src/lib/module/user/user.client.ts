import { defineRequestHandler } from "@yowza/rrequestor";
import { User } from ".";

namespace UserClient {
    export const request = {
        changeNickname: defineRequestHandler<{ newNickname: string }, string>({
            "url": "/api/user/change-nickname",
            method: "post"
        }),
        getUserData: defineRequestHandler<null, any>({
            url: "/api/user",
            method: 'get'
        }),
        changeShowRating: defineRequestHandler<{ nickname?: boolean; taikoNumber?: boolean; songs?: boolean }, void>({
            url: '/api/user/change-show-rating',
            method: 'post'
        })
    }

    export const donderRequest = {
        updateRating: defineRequestHandler<{ rating: number, exp: number, ratingData: User.DonderData['ratingData'] }, { count: number, ranking: number }>({
            url: '/api/user/update-rating',
            method: 'post'
        }),
        getRanking: defineRequestHandler<null, { count: number, ranking: number }>({
            url: '/api/user/ranking',
            method: 'get'
        })
    }

    export const adminRequest = {
        setGrade: defineRequestHandler<{ UUID: string, from: number, to: number }, void>(
            {
                url: "/admin/api/user/set_grade",
                method: "post"
            }
        )
    }
}

User.Client = UserClient;