import { noticeDBController } from "$lib/module/common/notice/notice.server";

export async function load(){
    const recentNotices = await noticeDBController.getRecentNotices();

    return {
        recentNotices
    }
}