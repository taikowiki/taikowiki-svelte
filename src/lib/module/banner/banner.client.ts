import { defineRequestHandler } from "@yowza/rrequestor";
import type { Banner } from "$lib/module/banner/types";

export namespace BannerClient {
    export const adminRequest = {
        updateMainBanner: defineRequestHandler<{ banners: Banner.MainBanner[] }, void>({
            url: '/admin/api/banner/main',
            method: 'post'
        }),
        updateAsideBanner: defineRequestHandler<{ banners: Banner.AsideBanner[] }, void>({
            url: '/admin/api/banner/aside',
            method: 'post'
        }),
    }
}