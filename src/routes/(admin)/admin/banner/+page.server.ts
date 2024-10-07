import { bannerDBController } from "$lib/module/common/banner/banner.server"
import { error } from "@sveltejs/kit";
import { runQuery } from "@yowza/db-handler"

export async function load({locals}){
    if(locals.userData?.grade !== 10){
        throw error(403);
    }

    const data: {
        mainBanners: Awaited<ReturnType<typeof bannerDBController.getMainBanner>>;
        asideBanners: Awaited<ReturnType<typeof bannerDBController.getAsideBanner>>
    } = await runQuery(async(run) => {
        return {
            mainBanners: await bannerDBController.getMainBanner.getCallback()(run),
            asideBanners: await bannerDBController.getAsideBanner.getCallback()(run)
        }
    })

    return data;
}