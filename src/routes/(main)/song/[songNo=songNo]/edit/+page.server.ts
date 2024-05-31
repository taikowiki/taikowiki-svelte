import { redirect } from '@sveltejs/kit';

export async function load({locals}){
    if(!locals.user){
        throw redirect(302, `/auth/login?redirect_to=${encodeURIComponent('/song/add')}`)
    }
}