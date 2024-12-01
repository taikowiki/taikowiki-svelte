import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import auth, { providers } from '@sveltekit-board/oauth'
import { userDBController } from "$lib/module/common/user/user.server";

import { config } from 'dotenv';
import checkPermissions from "$lib/module/server/hooks/permissionCheck.server";
import BanController from "$lib/module/server/hooks/ban-controller.server";
import allowOrigin from "$lib/module/server/hooks/allow-origin";
import { dynamicHtmlLang } from "$lib/module/server/hooks/dynamicHtmlLang.server";

//import logger from "$lib/module/server/hooks/logger.server";

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

const getUserData: Handle = async ({ event, resolve }) => {
    if (event.locals.user) {
        let userData = await userDBController.getDataByProvider(event.locals.user.provider, event.locals.user.providerId);
        if (!userData) {
            userData = await userDBController.createData(event.locals.user.provider, event.locals.user.providerId, event.locals.user.providerUserData ?? null)
        }
        event.locals.userData = userData;
    }
    else {
        event.locals.userData = null;
    }

    return await resolve(event);
}

const setAssetsCacheControl: Handle = async({event, resolve}) => {
    if(event.url.pathname.startsWith('/assets')){
        event.setHeaders({
            'Cache-Control': `max-age=${3600 * 24 * 7}`
        });
    }

    return await resolve(event);
}

const checkPermission = checkPermissions([
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

const cors = allowOrigin(["https://donderhiroba.jp"], {credentials: true});

Array.prototype.toSorted = function (compareFn?: any) {
    return [...this].sort(compareFn);
}

export const handle = sequence(BanController.checkIp, cors, authHandle, getUserData, checkPermission, setAssetsCacheControl, dynamicHtmlLang);