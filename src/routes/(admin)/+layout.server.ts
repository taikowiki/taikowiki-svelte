import { error, redirect } from '@sveltejs/kit';

export async function load({locals, url}){
    if(!locals.user){
        const param = new URLSearchParams({
            redirect_to: url.origin + "/admin"
        }).toString()
        redirect(302, url.origin + "/auth/login?" + param)
    }
    if(!locals.userBasicData || locals.userBasicData.grade < 9){
        throw error(403, "You have no permission to access admin page")
    }
}