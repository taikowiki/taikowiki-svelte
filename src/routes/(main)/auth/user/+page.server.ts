import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.userData) {
        redirect(302, `/auth/login?redirect_to=${encodeURIComponent('/auth/user')}`)
    }

    return {
        user: {
            provider: locals.userData.provider,
            UUID: locals.userData.UUID,
            nickname: locals.userData.nickname
        }
    }
}