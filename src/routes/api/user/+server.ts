import { getClientAddress } from '$lib/module/common/util.server.js';

export async function GET(event) {
    const { locals } = event;
    if (locals.user && locals.userData) {
        return new Response(JSON.stringify({
            logined: true,
            nickname: locals.userData.nickname
        }))
    }
    else {
        return new Response(JSON.stringify({
            logined: false,
            nickname: getClientAddress(event)
        }))
    }
}