import { User } from "$lib/module/user";
import '$lib/module/user/user.server';
import { redirect } from '@sveltejs/kit';

export async function POST(event) {
    const { request, locals } = event;
    const data = await request.formData();
    if (locals.user && locals.userData && data && data.has('UUID')) {
        if (locals.userData.UUID !== data.get('UUID')) redirect(302, '/auth/user');

        try {
            await User.Server.DBController.deleteUser(locals.userData.UUID);
            User.Server.logout(event);
        }
        catch (err: any) {
            redirect(302, '/auth/user');
        }
        redirect(302, '/');
    }

    redirect(302, '/auth/user');
}