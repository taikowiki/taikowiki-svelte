import UserController from '$lib/module/common/user/user-controller.server.js';
import { error } from '@sveltejs/kit';

export async function POST({ request, locals }) {
    if (!locals.userData) throw error(403);
    const { UUID } = locals.userData;

    const data = await request.json();
    if (!data) throw error(400);

    const { lang } = data;
    if (!lang) throw error(400);

    await UserController.setLang(UUID, lang);

    return new Response();
}