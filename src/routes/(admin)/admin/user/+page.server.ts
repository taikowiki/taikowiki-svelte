import {userDBController} from '$lib/module/common/user/user.server.js';
import { error } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.userData) throw error(403);

    const grade = locals.userData.grade;

    const users = grade === 10 ? await userDBController.getAll() : await userDBController.getAllUnderGrade(grade);

    return {
        users
    }
}