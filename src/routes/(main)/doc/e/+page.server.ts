import { error } from '@sveltejs/kit';

export async function load({locals}){
    if(!locals.userData){
        throw error(401);
    }
    if(locals.userData.grade < 2){
        throw error(403);
    }
}