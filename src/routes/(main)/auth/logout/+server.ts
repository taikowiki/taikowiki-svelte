import { redirect } from '@sveltejs/kit'

export async function GET({ cookies }) {
    cookies.delete('auth-user', { path: '/' })

    redirect(302, '/')
}