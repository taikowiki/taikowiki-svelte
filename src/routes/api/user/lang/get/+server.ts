import { userDBController } from '$lib/module/common/user/user.server';
import { error } from '@sveltejs/kit';

export async function GET({ locals }) {
    if (!locals.userData) throw error(403);
    const { UUID } = locals.userData;

    return new Response(await userDBController.getLang(UUID))
}