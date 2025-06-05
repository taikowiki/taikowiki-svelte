import { defineRequestHandler } from "@yowza/rrequestor";
import { Banner } from "$lib/module/banner";

namespace BannerClient {
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

Banner.Client = BannerClient;