import { User } from "$lib/module/user";
import '$lib/module/user/user.server';
import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from "./$types";
import { Util } from "$lib/module/util/util.server";

export async function POST(event: RequestEvent) {
    const { request, locals } = event;
    const data = await request.formData();
    if (locals.user && locals.userData && data && data.has('UUID')) {
        if (locals.userData.UUID !== data.get('UUID')) redirect(302, '/auth/user');

        try {
            await User.Server.DBController.deleteUser(locals.userData.UUID);
            await Util.Server.internalRequestor.deleteUserRating(locals.userData.UUID);
            User.Server.logout(event);
        }
        catch (err: any) {
            console.error(err);
            throw redirect(302, '/auth/user');
        }
        throw redirect(302, '/');
    }

    throw redirect(302, '/auth/user');
}