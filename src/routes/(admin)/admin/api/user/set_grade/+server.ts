
import { User } from "$lib/module/user";
import '$lib/module/user/user.client';
import { error } from '@sveltejs/kit';

export async function POST({ locals, request }) {
    if (!locals.userData) throw error(403);

    const data = await request.json();

    const { UUID, from, to } = data;
    if (!UUID || !from || !to) throw error(400);

    const { grade } = locals.userData;

    const user = await User.Server.DBController.getData(UUID);

    if(!user){
        throw error(400);
    }

    if (user.grade >= grade || to >= grade) throw error(403);

    await User.Server.DBController.setGrade(UUID, to);

    return new Response();
}