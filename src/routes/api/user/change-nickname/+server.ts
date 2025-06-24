import { User } from "$lib/module/user";
import '$lib/module/user/user.server';
import { error } from '@sveltejs/kit';

export async function POST({ request, locals }) {
    const data = await request.json();
    if (!locals.user || !locals.userData) {
        throw error(403, JSON.stringify({ status: 'fail', reason: 'Post data error' }));
    }

    if (data && "newNickname" in data) {
        try {
            await User.Server.DBController.changeNickname(locals.userData.UUID, data.newNickname);
            return new Response()
        }
        catch (err: any) {
            throw error(500)
        }
    }

    throw error(400)
}