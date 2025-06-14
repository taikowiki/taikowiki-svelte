import { Util } from '$lib/module/util/util.server';

const {getClientAddress} = Util.Server;

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