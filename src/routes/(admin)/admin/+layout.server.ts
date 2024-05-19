import { redirect } from '@sveltejs/kit';

export async function load({locals, url}){
    const user = locals.user;
    if(!user){
        const param = new URLSearchParams({
            redirect_to: url.origin + "/admin"
        }).toString()
        redirect(302, url.origin + "/auth/login?" + param)
    }
}