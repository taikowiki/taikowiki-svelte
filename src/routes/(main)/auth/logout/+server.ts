import { User } from '$lib/module/user';
import '$lib/module/user/user.server';
import { redirect, type RequestEvent } from '@sveltejs/kit'

export async function GET(event: RequestEvent) {
    User.Server.logout(event);

    redirect(302, '/')
}