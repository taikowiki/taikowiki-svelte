import { defineDBHandler } from "@yowza/db-handler";
import type { Banner } from "$lib/module/banner/types";

export namespace BannerServer {
    export const DBController = {
        getMainBanner: defineDBHandler<[], Banner.MainBanner[] | null>(() => {
            return async (run) => {
                const result = await run("SELECT * FROM `banner` WHERE `type` = 'main'");
                if (result.length === 0) {
                    return null;
                }

                try {
                    return JSON.parse(result[0].data ?? "[]")
                }
                catch {
                    return null;
                }
            }
        }),
        /**
         * @param {MainBanner[]} banners
         */
        updateMainBanner: defineDBHandler<[Banner.MainBanner[]], void>((banners) => {
            return async (run) => {
                const mainBanners = await DBController.getMainBanner.getCallback()(run);

                if (mainBanners === null) {
                    await run("INSERT INTO `banner` (`type`, `data`) VALUES (?, ?)", ['main', JSON.stringify(banners)])
                }
                else {
                    await run("UPDATE `banner` SET `data` = ? WHERE `type` = ?", [JSON.stringify(banners), 'main'])
                }
            }
        }),
        getAsideBanner: defineDBHandler<[], Banner.AsideBanner[] | null>(() => {
            return async (run) => {
                const result = await run("SELECT * FROM `banner` WHERE `type` = 'aside'");
                if (result.length === 0) {
                    return null;
                }

                try {
                    return JSON.parse(result[0].data ?? "[]")
                }
                catch {
                    return null;
                }
            }
        }),
        /**
         * @param {AsideBanner[]} banners
         */
        updateAsideBanner: defineDBHandler<[Banner.AsideBanner[]], void>((banners) => {
            return async (run) => {
                const asideBanners = await DBController.getAsideBanner.getCallback()(run);

                if (asideBanners === null) {
                    await run("INSERT INTO `banner` (`type`, `data`) VALUES (?, ?)", ['aside', JSON.stringify(banners)])
                }
                else {
                    await run("UPDATE `banner` SET `data` = ? WHERE `type` = ?", [JSON.stringify(banners), 'aside'])
                }
            }
        })
    }
}