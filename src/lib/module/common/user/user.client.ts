import { defineRequestHandler } from "@yowza/rrequestor";

export const userRequestor = {
    changeNickname: defineRequestHandler<{ newNickname: string }, string>({
        "url": "/api/user/change_nickname",
        method: "post"
    }),
    getUserData: defineRequestHandler<null, any>({
        url: "/api/user",
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