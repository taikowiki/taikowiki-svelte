import { BannerServer } from "$lib/module/common/banner/banner.server.js";
import { songDBController } from "$lib/module/common/song/song.server";
import { UAParser } from "ua-parser-js";
import { isbot } from "isbot";
import pkg from "../../../package.json";
import { getClientAddress } from "$lib/module/common/util.server";

export async function load(event) {
    const { locals, request, cookies } = event;
    const user = {
        logined: !!locals.userData,
        nickname: !!locals.userData ? locals.userData.nickname : getClientAddress(event),
    };
    const isAdmin = locals.userData ? locals.userData.grade >= 9 : false;

    // Use UA to know if the device is mobile.
    let isMobile = false;
    const userAgent = request.headers.get("user-agent");
    if (userAgent) {
        const parsedUA = new UAParser(userAgent);
        if (
            parsedUA.getDevice().model === "iPhone" ||
            (parsedUA.getOS().name === "Android" &&
                parsedUA.getDevice().type !== "tablet")
        ) {
            isMobile = true;
        }
    }

    // IsBot
    let isBot = false;
    if (userAgent) {
        isBot = isbot(userAgent);
    }

    // Use cookie to get theme
    const themeCookie = cookies.get("theme");
    let theme: "light" | "dark" = "light";
    if (themeCookie && (themeCookie === "light" || themeCookie === "dark")) {
        theme = themeCookie;
    }

    const [newSongs, asideBanners] = await Promise.all([
        songDBController.getNewSongs(3),
        BannerServer.DBController.getAsideBanner(),
    ]);

    return {
        newSongs,
        user,
        version: pkg.version,
        kakaoKey: process.env.KAKAO_JAVASCRIPT_KEY,
        isMobile,
        isBot,
        theme,
        asideBanners,
        isAdmin
    };
}
