import { Notice } from '$lib/module/notice/index.js';
import '$lib/module/notice/notice.server.js';
import { runQuery } from "@yowza/db-handler";

export async function load({ url }) {
    const page = Number(url.searchParams.get("page")) || 1;
    const type = (url.searchParams.get("type") as Notice.Notice["type"]) ?? undefined;

    const data = await runQuery(async (run) => {
        const [notices, count] = await Promise.all([
            Notice.Server.DBController.getNoticeList.getCallback({ page, type })(run),
            Notice.Server.DBController.countNotice.getCallback()(run),
        ]);

        return { notices, count };
    });

    return data;
}
