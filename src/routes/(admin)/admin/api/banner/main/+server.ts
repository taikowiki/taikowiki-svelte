import { Banner } from "$lib/module/banner";
import '$lib/module/banner/banner.server';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

export async function POST({ request }) {
    const requestData = await request.json();
    const banners: Banner.MainBanner[] = requestData.banners;

    if (!z.array(Banner.Schema.MainBanner).safeParse(banners).success) {
        throw error(400, JSON.stringify({
            reason: 'Type Error'
        }));
    }

    await Banner.Server.DBController.updateMainBanner(banners);

    return new Response();
}