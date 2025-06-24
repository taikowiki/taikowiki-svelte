import { Banner } from "$lib/module/banner";
import "$lib/module/banner/banner.server";
import { Notice } from '$lib/module/notice/index.js';
import '$lib/module/notice/notice.server.js';
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
            Notice.Server.DBController.getRecentNotices.getCallback()(run),
            Banner.Server.DBController.getMainBanner.getCallback()(run),
        ]);

        return { recentNotices, mainBanners: mainBanners ?? [] };
    });

    return data;
}
