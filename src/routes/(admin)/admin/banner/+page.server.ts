import { BannerServer } from "$lib/module/common/banner/banner.server"
import { error } from "@sveltejs/kit";
import { runQuery } from "@yowza/db-handler"

export async function load({locals}){
    if(locals.userData?.grade !== 10){
        throw error(403);
    }

    const data: {
        mainBanners: Awaited<ReturnType<typeof BannerServer.DBController.getMainBanner>>;
        asideBanners: Awaited<ReturnType<typeof BannerServer.DBController.getAsideBanner>>
    } = await runQuery(async(run) => {
        return {
            mainBanners: await BannerServer.DBController.getMainBanner.getCallback()(run),
            asideBanners: await BannerServer.DBController.getAsideBanner.getCallback()(run)
        }
    })

    return data;
}