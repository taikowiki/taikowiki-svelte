import { error, redirect, type Handle } from "@sveltejs/kit";
import { runQuery } from "@yowza/db-handler";
import { I18N } from "$lib/module/i18n/";
import { sequence } from "@sveltejs/kit/hooks";
import { User } from "$lib/module/user";
import '$lib/module/user/user.server';
import { Util } from "../util";
import '../util/util.server'

export namespace Hooks {
    /**
     * 특정 Origin에서의 요청 허용
     */
    export function allowOrigin(allowedOrigin: string, allowedPath: string, option?: AllowOriginOption) {
        const handle: Handle = async ({ event, resolve }) => {
            const origin = event.request.headers.get('Origin');
            if (!origin) return await resolve(event);

            const response = await resolve(event);
            if ((allowedOrigin === "*" || origin === allowedOrigin) && event.url.pathname.startsWith(allowedPath)) {
                response.headers.set("Access-Control-Allow-Origin", origin);
                response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
                response.headers.set("Access-Control-Allow-Headers", "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization");
                if (option?.credentials) {
                    response.headers.set("Access-Control-Allow-Credentials", "true");
                }
                if (event.request.method === "OPTIONS") {
                    return new Response(response.body, {
                        ...response,
                        status: 204
                    });
                }
            }

            return response;
        }
        return handle;
    }

    /**
     * ip체크
     */
    export const checkIp: Handle = async ({ event, resolve }) => {
        const banned = await runQuery(async (run) => {
            let clientAddress: string;
            try {
                clientAddress = Util.Server.getClientAddress(event);
                const result = await run("SELECT COUNT(*) FROM `ban/ip` WHERE `ip` = ?", [clientAddress]);
                if (Object.values(result[0]) === undefined) {
                    return false;
                }
                return Object.values(result[0])?.[0] !== 0;
            }
            catch {
                return false;
            }
        })

        if (banned) {
            throw error(403, 'Your IP Address has been BANNED.')
        }

        return await resolve(event);
    }

    /**
     * HTML lang 설정
     */
    export const dynamicHtmlLang: Handle = async ({ event, resolve }) => {
        const urlLang = event.url.searchParams.get('lang');
        const languages = Object.keys(I18N.i18n);
        let lang = 'ko';
        if (urlLang && (languages.includes(urlLang))) {
            lang = urlLang;
        }
        else {
            const cookieLang = event.cookies.get('language');
            if (cookieLang && languages.includes(cookieLang)) {
                lang = cookieLang;
            }
            else {
                event.cookies.set('lang', 'ko', { path: '/' });
            }
        }
        return await resolve(event, {
            transformPageChunk: ({ html }) => html.replace('%lang%', lang)
        });
    }

    /**
     * 방문 페이지 로딩
     */
    export const logger: Handle = async ({ event, resolve }) => {
        let UUID: string | null = null;
        if (event.locals.userData) {
            UUID = event.locals.userData.UUID
        }
        await runQuery(async (run) => {
            return await run("INSERT INTO `log` (`UUID`, `ip`, `path`) VALUES (?, ?, ?)", [UUID, Util.Server.getClientAddress(event), event.url.pathname]);
        })

        return await resolve(event);
    }

    /**
     * 특정 경로 요청 권한 체크
     */
    export function checkPermissions(options: PermissionCheckerOption[]): Handle {
        return sequence(...options.map(option => createPermissionChecker(option.path, option.level, option.rule, option.redirectPath)))
    }

    /**
     * DB에서 유저 데이터 가져오기
     */
    export const getUserData: Handle = async ({ event, resolve }) => {
        if (event.locals.user) {
            if (await User.Server.DBController.checkAuthBanned(event.locals.user.provider, event.locals.user.providerId)) {
                User.Server.logout(event);
                throw error(499);
            }
            let userData = await User.Server.DBController.getDataByProvider(event.locals.user.provider, event.locals.user.providerId);
            if (!userData) {
                userData = await User.Server.DBController.createData(event.locals.user.provider, event.locals.user.providerId, event.locals.user.providerUserData ?? null)
            }
            event.locals.userData = userData;
        }
        else {
            event.locals.userData = null;
        }

        return await resolve(event);
    }

    /**
     * `/assets` 요청 캐시 설정
     */
    export const setAssetsCacheControl: Handle = async ({ event, resolve }) => {
        if (event.url.pathname.startsWith('/assets')) {
            event.setHeaders({
                'Cache-Control': `max-age=${3600 * 24 * 7}`
            });
        }

        return await resolve(event);
    }

    function createPermissionChecker(path: string, level: number, rule: 'match' | 'startsWith', redirectPath?: string): Handle {
        return async function (input) {
            const { locals, url } = input.event;

            switch (rule) {
                case ("match"): {
                    if (url.pathname !== path) {
                        return await input.resolve(input.event);
                    }
                    break;
                }
                case ("startsWith"): {
                    if (!url.pathname.startsWith(path)) {
                        return await input.resolve(input.event);
                    }
                    break;
                }
            }

            if (!locals.user) {
                if (!redirectPath) {
                    throw error(403, "You have no permission to access to this page");
                }

                const param = new URLSearchParams({
                    redirect_to: url.origin + path
                }).toString()

                throw redirect(302, url.origin + redirectPath + "?" + param)
            }

            if (!locals.userData) {
                throw error(403, "You have no permission to access to this page");
            }

            if (locals.userData.grade < level) {
                throw error(401, "You have no permission to access to this page");
            }

            return await input.resolve(input.event);
        }
    }
}

export namespace Hooks {
    export interface AllowOriginOption {
        credentials?: boolean
    }

    export interface PermissionCheckerOption {
        path: string,
        level: number,
        rule: 'match' | 'startsWith',
        redirectPath?: string
    }
}