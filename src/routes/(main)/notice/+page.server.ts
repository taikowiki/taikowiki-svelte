import { noticeDBController } from "$lib/module/common/notice/notice.server";
import type { Notice } from "$lib/module/common/notice/types.js";
import { runQuery } from "@yowza/db-handler";

export async function load({ url }) {
  const page = Number(url.searchParams.get("page")) || 1;
  const type = (url.searchParams.get("type") as Notice["type"]) ?? undefined;

  const data = await runQuery(async (run) => {
    const [notices, count] = await Promise.all([
      noticeDBController.getNoticeList.getCallback({ page, type })(run),
      noticeDBController.countNotice.getCallback()(run),
    ]);

    return { notices, count };
  });

  return data;
}
