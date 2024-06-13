import UserController from '$lib/module/common/user/user-controller.server.js';
import { error } from '@sveltejs/kit';

export async function GET({ locals }) {
    if (!locals.userData) throw error(403);
    const { UUID } = locals.userData;

    return new Response(await UserController.getLang(UUID))
}