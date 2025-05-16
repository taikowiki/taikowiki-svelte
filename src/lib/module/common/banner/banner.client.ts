import { defineRequestHandler } from "@yowza/rrequestor";
import type { BannerType } from "$lib/module/common/banner/types";

export namespace BannerClient {
    export const adminRequestor = {
        updateMainBanner: defineRequestHandler<{ banners: BannerType.MainBanner[] }, void>({
            url: '/admin/api/banner/main',
            method: 'post'
        }),
        updateAsideBanner: defineRequestHandler<{ banners: BannerType.AsideBanner[] }, void>({
            url: '/admin/api/banner/aside',
            method: 'post'
        }),
    }
}