import UserController from '$lib/module/common/user/user-controller.server.js';
import { error } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.userData) throw error(403);

    const grade = locals.userData.grade;

    const users = grade === 10 ? await UserController.getAll() : await UserController.getAll(grade);

    return {
        users
    }
}