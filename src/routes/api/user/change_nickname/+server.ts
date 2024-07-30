import { userDBController } from '$lib/module/common/user/user.server.js';
import { error } from '@sveltejs/kit';

export async function POST({ request, locals }) {
    const data = await request.json();
    if (!locals.user || !locals.userData) {
        throw error(403, JSON.stringify({ status: 'fail', reason: 'Post data error' }));
    }

    if (data && "newNickname" in data) {
        try {
            await userDBController.changeNickname(locals.userData.UUID, data.newNickname);
            return new Response()
        }
        catch (err: any) {
            throw error(500)
        }
    }

    throw error(400)
}