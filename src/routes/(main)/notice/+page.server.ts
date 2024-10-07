import { noticeDBController } from "$lib/module/common/notice/notice.server";
import type { Notice } from "$lib/module/common/notice/types.js";
import { runQuery } from "@yowza/db-handler";

export async function load({url}){
    const page = Number(url.searchParams.get('page')) || 1;

    const data: {notices: Notice[], count: number} = await runQuery(async(run) => {
        return {
            notices: await noticeDBController.getNoticeList.getCallback(page)(run),
            count: await noticeDBController.countNotice.getCallback()(run)
        }
    })

    return data
}