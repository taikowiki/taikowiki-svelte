import { userDBController } from '$lib/module/common/user/user.server.js';
import { error } from '@sveltejs/kit';

export async function POST({ locals, request }) {
    if (!locals.userData) throw error(403);

    const data = await request.json();

    const { UUID, from, to } = data;
    if (!UUID || !from || !to) throw error(400);

    const { grade } = locals.userData;

    if (from >= grade || to >= grade) throw error(403);

    await userDBController.setGrade(UUID, to);

    return new Response();
}