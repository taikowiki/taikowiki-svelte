import { bannerDBController } from '$lib/module/common/banner/banner.server.js';
import { MainBannerTyper, type MainBanner } from '$lib/module/common/banner/types';
import { error } from '@sveltejs/kit';
import typer from 'typer-ts';

export async function POST({request}){
    const requestData = await request.json();
    const banners: MainBanner[] = requestData.banners;

    if(!new typer.Array([MainBannerTyper] as const).check(banners)){
        throw error(400, JSON.stringify({
            reason: 'Type Error'
        }));
    }

    await bannerDBController.updateMainBanner(banners);

    return new Response();
}