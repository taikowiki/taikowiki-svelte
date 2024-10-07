import { bannerDBController } from '$lib/module/common/banner/banner.server.js';
import { AsideBannerTyper, type AsideBanner } from '$lib/module/common/banner/types';
import { error } from '@sveltejs/kit';
import typer from 'typer-ts';

export async function POST({request}){
    const requestData = await request.json();
    const banners: AsideBanner[] = requestData.banners;

    if(!new typer.Array([AsideBannerTyper] as const).check(banners)){
        throw error(400, JSON.stringify({
            reason: 'Type Error'
        }));
    }

    await bannerDBController.updateAsideBanner(banners);

    return new Response();
}