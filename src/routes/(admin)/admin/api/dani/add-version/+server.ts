import { daniDBController } from '$lib/module/common/dani/dani.server.js';
import { error } from '@sveltejs/kit';

export async function POST({request}){
    const version = await request.text();

    if(!version) throw error(400);

    const hasVersion = await daniDBController.hasVersion(version);

    if(hasVersion) throw error(400);

    await daniDBController.addVersion(version)

    return new Response();
}