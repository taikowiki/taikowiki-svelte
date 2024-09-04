import { songDBController } from '$lib/module/common/song/song.server';
import { UAParser } from 'ua-parser-js';

export async function load({ fetch, request }) {
    const user = await (await fetch('/api/user')).json();
    
    let isMobile = false;
    const userAgent = request.headers.get('user-agent');
    if(userAgent){
        const parsedUA = new UAParser(userAgent);
        if(parsedUA.getDevice().model === "iPhone" || (parsedUA.getOS().name === 'Android' && parsedUA.getDevice().type !== 'tablet')){
            isMobile = true;
        }
    }

    return {
        newSongs: await songDBController.getNewSongs(3),
        user,
        version: (await import('../../../package.json')).version,
        kakaoKey: process.env.KAKAO_JAVASCRIPT_KEY,
        isMobile
    }
}