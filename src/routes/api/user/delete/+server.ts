import { User } from "$lib/module/user";
import '$lib/module/user/user.server';
import { redirect } from '@sveltejs/kit';

export async function POST({ request, locals, cookies }) {
    const data = await request.formData();
    if (locals.user && locals.userData && data && data.has('UUID')) {
        if (locals.userData.UUID !== data.get('UUID')) redirect(302, '/auth/user');

        try {
            await User.Server.DBController.deleteUser(locals.userData.UUID);
            cookies.delete("auth-user", { path: '/' });
        }
        catch (err: any) {
            redirect(302, '/auth/user');
        }
        redirect(302, '/');
    }

    redirect(302, '/auth/user');
}