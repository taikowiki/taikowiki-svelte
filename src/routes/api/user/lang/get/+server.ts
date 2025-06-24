import { User } from "$lib/module/user";
import '$lib/module/user/user.client';
import { error } from '@sveltejs/kit';

export async function GET({ locals }) {
    if (!locals.userData) throw error(403);
    const { UUID } = locals.userData;

    return new Response(await User.Server.DBController.getLang(UUID))
}