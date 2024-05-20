import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import auth, { providers } from '@sveltekit-board/oauth'
import UserController from "$lib/module/common/user/user-controller.server";

import { config } from 'dotenv';

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
    autoRefreshMaxAge: true
})

const getUserData: Handle = async ({ event, resolve }) => {
    if (event.locals.user) {
        event.locals.userBasicData = await UserController.getBasicData(event.locals.user.provider, event.locals.user.providerId);
        event.locals.userData = await UserController.getData(event.locals.user.provider, event.locals.user.providerId);
    }

    return await resolve(event);
}

const test:Handle = async({event, resolve}) => {
    console.log(event.request.url);
    return await resolve(event);
}

export const handle = sequence(authHandle, getUserData);