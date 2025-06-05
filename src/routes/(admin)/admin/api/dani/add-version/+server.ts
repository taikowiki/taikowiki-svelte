import { Dani } from '$lib/module/dani/index.js';
import '$lib/module/dani/dani.server.js';
import { error } from '@sveltejs/kit';

export async function POST({request}){
    const version = await request.text();

    if(!version) throw error(400);

    const hasVersion = await Dani.Server.DBController.hasVersion(version);

    if(hasVersion) throw error(400);

    await Dani.Server.DBController.addVersion(version)

    return new Response();
}