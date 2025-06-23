import { sequence } from "@sveltejs/kit/hooks";
import auth, { providers } from '@sveltekit-board/oauth'

import { config } from 'dotenv';
import { Hooks } from "$lib/module/hooks";

config();

const provider = {
    github: new providers.Github({
        clientId: process.env.GITHUB_CLIENT_ID ?? "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ""
    }),
    kakao: new providers.Kakao({
        clientId: process.env.KAKAO_CLIENT_ID ?? "",
        clientSecret: process.env.KAKAO_CLIENT_SECRET ?? ""
    })
}

const authHandle = auth(Object.values(provider), {
    key: process.env.AUTH_KEY ?? '',
    maxAge: 3600 * 24 * 7,
    autoRefreshMaxAge: true,
    withCredentials: true
})

const checkPermission = Hooks.checkPermissions([
    {
        path: '/admin/api',
        level: 9,
        rule: 'startsWith',
    },
    {
        path: '/admin',
        level: 9,
        rule: 'startsWith',
        redirectPath: '/auth/login'
    },
    {
        path: '/auth/user',
        level: 1,
        rule: 'startsWith',
        redirectPath: '/auth/login'
    }
])

const cors = Hooks.allowOrigin(["https://donderhiroba.jp"], {credentials: true});

Array.prototype.toSorted = function (compareFn?: any) {
    return [...this].sort(compareFn);
}

export const handle = sequence(Hooks.checkIp, cors, authHandle, Hooks.getUserData, checkPermission, Hooks.setAssetsCacheControl, Hooks.dynamicHtmlLang);