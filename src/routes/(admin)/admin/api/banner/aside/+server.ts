import { Banner } from "$lib/module/banner";
import '$lib/module/banner/banner.server.js';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

export async function POST({request}){
    const requestData = await request.json();
    const banners: Banner.AsideBanner[] = requestData.banners;
    
    if(!z.array(Banner.Schema.AsideBanner).safeParse(banners).success){
        throw error(400, JSON.stringify({
            reason: 'Type Error'
        }));
    }

    await Banner.Server.DBController.updateAsideBanner(banners);

    return new Response();
}