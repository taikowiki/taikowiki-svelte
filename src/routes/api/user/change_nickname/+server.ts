import { userDBController } from '$lib/module/common/user/user.server.js';
import { error } from '@sveltejs/kit';

export async function POST({ request, locals }) {
    const data = await request.json();
    if (!locals.user || !locals.userData) {
        throw error(403, JSON.stringify({ status: 'fail', reason: 'Post data error' }));
    }

    if (data && "UUID" in data && "newNickname" in data) {
        if (locals.userData.UUID !== data.UUID) return new Response(JSON.stringify({ status: 'fail', reason: 'UUID not matched' }));

        try {
            await userDBController.changeNickname(locals.userData.provider, locals.userData.providerId, data.newNickname);
            return new Response(JSON.stringify({ status: 'success' }))
        }
        catch (err: any) {
            return new Response(JSON.stringify({ status: 'fail', reason: err.message }));
        }
    }

    return new Response(JSON.stringify({ status: 'fail', reason: 'Post data error' }));
}