import { BannerServer } from '$lib/module/common/banner/banner.server.js';
import { BannerType } from "$lib/module/common/banner/types";
import { error } from '@sveltejs/kit';
import { z } from 'zod';

export async function POST({request}){
    const requestData = await request.json();
    const banners: BannerType.AsideBanner[] = requestData.banners;
    
    if(!z.array(BannerType.Schema.AsideBanner).safeParse(banners).success){
        throw error(400, JSON.stringify({
            reason: 'Type Error'
        }));
    }

    await BannerServer.DBController.updateAsideBanner(banners);

    return new Response();
}