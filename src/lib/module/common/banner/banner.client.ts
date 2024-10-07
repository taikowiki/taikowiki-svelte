import { defineRequestHandler } from "@yowza/rrequestor";
import type { AsideBanner, MainBanner } from "./types";

export const bannerAdminRequestor = {
    /**
     * @param {MainBanner[]} banners
     */
    updateMainBanner: defineRequestHandler<{banners: MainBanner[]}, void>({
        url: '/admin/api/banner/main',
        method: 'post'
    }),
    /**
     * @param {AsideBanner[]} banners
     */
    updateAsideBanner: defineRequestHandler<{banners: AsideBanner[]}, void>({
        url: '/admin/api/banner/aside',
        method: 'post'
    }),
}