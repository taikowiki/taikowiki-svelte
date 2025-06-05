import { NoticeServer } from '$lib/module/notice/notice.server.js';
import type { Notice } from "$lib/module/notice";
import { runQuery } from "@yowza/db-handler";

export async function load({ url }) {
    const page = Number(url.searchParams.get("page")) || 1;
    const type = (url.searchParams.get("type") as Notice.Notice["type"]) ?? undefined;

    const data = await runQuery(async (run) => {
        const [notices, count] = await Promise.all([
            NoticeServer.DBController.getNoticeList.getCallback({ page, type })(run),
            NoticeServer.DBController.countNotice.getCallback()(run),
        ]);

        return { notices, count };
    });

    return data;
}
