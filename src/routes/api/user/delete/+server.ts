import { userDBController } from '$lib/module/common/user/user.server.js';
import { redirect } from '@sveltejs/kit';

export async function POST({ request, locals, cookies }) {
    const data = await request.formData();
    if (locals.user && locals.userData && data && data.has('UUID')) {
        if (locals.userData.UUID !== data.get('UUID')) redirect(302, '/auth/user');

        try {
            await userDBController.deleteUser(locals.userData.UUID);
            cookies.delete("auth-user", { path: '/' });
        }
        catch (err: any) {
            redirect(302, '/auth/user');
        }
        redirect(302, '/');
    }

    redirect(302, '/auth/user');
}