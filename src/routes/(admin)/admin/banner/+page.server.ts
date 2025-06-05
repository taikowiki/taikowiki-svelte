import { Banner } from "$lib/module/banner/index.js";
import '$lib/module/banner/banner.server';
import { error } from "@sveltejs/kit";
import { runQuery } from "@yowza/db-handler"

export async function load({locals}){
    if(locals.userData?.grade !== 10){
        throw error(403);
    }

    const data: {
        mainBanners: Awaited<ReturnType<typeof Banner.Server.DBController.getMainBanner>>;
        asideBanners: Awaited<ReturnType<typeof Banner.Server.DBController.getAsideBanner>>
    } = await runQuery(async(run) => {
        return {
            mainBanners: await Banner.Server.DBController.getMainBanner.getCallback()(run),
            asideBanners: await Banner.Server.DBController.getAsideBanner.getCallback()(run)
        }
    })

    return data;
}