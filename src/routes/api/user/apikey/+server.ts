import { User } from '$lib/module/user/index.js';
import '$lib/module/user/user.server.js';
import { error } from '@sveltejs/kit';

export async function GET({locals}){
    if(!locals.userData) throw error(403);

    const key = await User.Server.apiKeyDBController.generateKey(locals.userData.UUID);

    return new Response(key);
}