import { noticeDBController } from "$lib/module/common/notice/notice.server";

export async function load(){
    return {
        notices: await noticeDBController.getNoticeList()
    }
}