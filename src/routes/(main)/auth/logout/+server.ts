import { redirect } from '@sveltejs/kit'

export async function GET({ cookies }) {
    cookies.delete('auth-user', { path: '/' });
    cookies.delete('auth-user', { path: '/', domain: '.taiko.wiki' });

    redirect(302, '/')
}