import { error } from '@sveltejs/kit';

export async function load({locals}){
    if(!locals.user){
        throw error(401);
    }
}