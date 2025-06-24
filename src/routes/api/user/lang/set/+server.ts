import { User } from "$lib/module/user";
import '$lib/module/user/user.client';
import { error } from '@sveltejs/kit';

export async function POST({ request, locals }) {
    if (!locals.userData) throw error(403);
    const { UUID } = locals.userData;

    const data = await request.json();
    if (!data) throw error(400);

    const { lang } = data;
    if (!lang) throw error(400);

    await User.Server.DBController.setLang(UUID, lang);

    return new Response();
}