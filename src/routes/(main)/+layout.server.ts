import SongDB from '$lib/module/common/song/song.server.js';

export async function load({ fetch }) {
    const user = await (await fetch('/api/user')).json()
    return {
        newSongs: await SongDB.getNewSongs(),
        user,
        version: (await import('../../../package.json')).version,
        kakaoKey: process.env.KAKAO_JAVASCRIPT_KEY
    }
}