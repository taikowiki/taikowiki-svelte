import { BannerServer } from "$lib/module/banner/banner.server";
import { Banner } from "$lib/module/banner/types";
import { noticeDBController } from "$lib/module/common/notice/notice.server";
import type { Notice } from "$lib/module/common/notice/types";
import { runQuery } from "@yowza/db-handler";

export async function load() {
    const data: {
        recentNotices: {
            wiki: Omit<Notice, "content">[];
            official: Omit<Notice, "content">[];
        };
        mainBanners: Banner.MainBanner[];
    } = await runQuery(async (run) => {
        const [recentNotices, mainBanners] = await Promise.all([
            noticeDBController.getRecentNotices.getCallback()(run),
            BannerServer.DBController.getMainBanner.getCallback()(run),
        ]);

        return { recentNotices, mainBanners: mainBanners ?? [] };
    });

    return data;
}
