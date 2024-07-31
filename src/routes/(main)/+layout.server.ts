import { songDBController } from '$lib/module/common/song/song.server';

export async function load({ fetch }) {
    const user = await (await fetch('/api/user')).json()
    return {
        newSongs: await songDBController.getNewSongs(3),
        user,
        version: (await import('../../../package.json')).version,
        kakaoKey: process.env.KAKAO_JAVASCRIPT_KEY
    }
}