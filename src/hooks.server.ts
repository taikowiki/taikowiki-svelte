import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import auth, { providers } from '@sveltekit-board/oauth'
import UserController from "$lib/module/common/user/user-controller.server";

import { config } from 'dotenv';

config();

const github = new providers.Github({
    clientId: process.env.GITHUB_CLIENT_ID ?? "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ""
})
const kakao = new providers.Kakao({
    clientId: process.env.KAKAO_CLIENT_ID ?? "",
    clientSecret: process.env.KAKAO_CLIENT_SECRET ?? ""
})

const authHandle = auth([github, kakao], {
    key: process.env.AUTH_KEY ?? '',
    maxAge: 3600,
    autoRefreshMaxAge: true
})

const getUserData: Handle = async ({ event, resolve }) => {
    if (event.locals.user) {
        event.locals.userBasicData = await UserController.getBasicData(event.locals.user.provider, event.locals.user.providerId);
    }

    return await resolve(event);
}

export const handle = sequence(authHandle, getUserData);