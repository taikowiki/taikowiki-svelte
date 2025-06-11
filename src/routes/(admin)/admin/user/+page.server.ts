import { User } from "$lib/module/user";
import '$lib/module/user/user.client';
import { error } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.userData) throw error(403);

    const grade = locals.userData.grade;

    const users = grade === 10 ? await User.Server.DBController.getAll() : await User.Server.DBController.getAllUnderGrade(grade);

    return {
        users
    }
}