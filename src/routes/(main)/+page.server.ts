import { BannerServer } from "$lib/module/banner/banner.server";
import { Banner } from "$lib/module/banner/types";
import { NoticeServer } from '$lib/module/notice/notice.server.js';
import type { Notice } from "$lib/module/notice";
import { runQuery } from "@yowza/db-handler";

export async function load() {
    const data: {
        recentNotices: {
            wiki: Omit<Notice.Notice, "content">[];
            official: Omit<Notice.Notice, "content">[];
        };
        mainBanners: Banner.MainBanner[];
    } = await runQuery(async (run) => {
        const [recentNotices, mainBanners] = await Promise.all([
            NoticeServer.DBController.getRecentNotices.getCallback()(run),
            BannerServer.DBController.getMainBanner.getCallback()(run),
        ]);

        return { recentNotices, mainBanners: mainBanners ?? [] };
    });

    return data;
}
