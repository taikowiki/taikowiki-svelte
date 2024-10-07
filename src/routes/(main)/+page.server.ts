import { bannerDBController } from "$lib/module/common/banner/banner.server";
import type { MainBanner } from "$lib/module/common/banner/types";
import { noticeDBController } from "$lib/module/common/notice/notice.server";
import type { Notice } from "$lib/module/common/notice/types";
import { runQuery } from "@yowza/db-handler";

export async function load() {
    const data: {
        recentNotices: {
            wiki: Omit<Notice, 'content'>[];
            official: Omit<Notice, 'content'>[];
        },
        mainBanners: MainBanner[]
    } = await runQuery(async (run) => {
        const recentNotices = await noticeDBController.getRecentNotices.getCallback()(run);
        const mainBanners = await bannerDBController.getMainBanner.getCallback()(run) ?? [];

        return {
            recentNotices,
            mainBanners
        }
    })

    return data;
}