import { bannerDBController } from '$lib/module/common/banner/banner.server.js';
import { songDBController } from '$lib/module/common/song/song.server';
import { UAParser } from 'ua-parser-js';

export async function load({ fetch, request, cookies }) {
    const user = await (await fetch('/api/user')).json();
    
    // Use UA to know if the device is mobile.
    let isMobile = false;
    const userAgent = request.headers.get('user-agent');
    if(userAgent){
        const parsedUA = new UAParser(userAgent);
        if(parsedUA.getDevice().model === "iPhone" || (parsedUA.getOS().name === 'Android' && parsedUA.getDevice().type !== 'tablet')){
            isMobile = true;
        }
    }

    // Use cookie to get theme
    const themeCookie = cookies.get('theme');
    let theme: 'light' | 'dark' = 'light';
    if(themeCookie && (themeCookie === 'light' || themeCookie === 'dark')){
        theme = themeCookie;
    }

    return {
        newSongs: await songDBController.getNewSongs(3),
        user,
        version: (await import('../../../package.json')).version,
        kakaoKey: process.env.KAKAO_JAVASCRIPT_KEY,
        isMobile,
        theme,
        asideBanners: await bannerDBController.getAsideBanner()
    }
}