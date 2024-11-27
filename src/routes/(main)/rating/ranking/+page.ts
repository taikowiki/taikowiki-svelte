import { redirect } from "@sveltejs/kit";

export function load(){
    throw redirect(302, '/rating/ranking/1')
}