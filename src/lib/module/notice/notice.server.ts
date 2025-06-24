import { defineDBHandler, queryBuilder, Where } from "@yowza/db-handler";
import { Notice } from ".";

namespace NoticeServer {
    export const DBController = {
        /**@param page*/
        getNoticeList: defineDBHandler<[{ page?: number; type?: 'wiki' | 'official' }?], Omit<Notice.Notice, 'content'>[]>((param) => {
            return async (run) => {
                const { page, type } = param ?? {};
                let selectBuilder: any = queryBuilder.select('notice', ['order', 'title', 'type', 'writtenDate', 'officialDate']);
                if (type === "wiki" || type === "official") {
                    selectBuilder = selectBuilder.where(Where.Compare('type', '=', type))
                }
                selectBuilder = selectBuilder.orderby('order', 'desc');
                if (page) {
                    selectBuilder = selectBuilder.limit((page - 1) * 30, 30)
                }

                return await run(selectBuilder.build())
            }
        }),
        /**@param notice */
        writeNotice: defineDBHandler<[Omit<Notice.Notice, 'writtenDate' | 'order'>], number>(({ title, content, type, officialDate }) => {
            return async (run) => {
                const result = await run("INSERT INTO `notice` (`title`, `content`, `type`, `officialDate`) VALUES (?, ?, ?, ?)", [title, content, type, officialDate]);
                return result.insertId;
            }
        }),
        countNotice: defineDBHandler<[], number>(() => {
            return async (run) => {
                const result = await run("SELECT COUNT(*) FROM `notice`");
                return Object.values(result[0])[0] as number;
            }
        }),
        /**@param order */
        getNoticeByOrder: defineDBHandler<[number], Notice.Notice | null>((order) => {
            return async (run) => {
                return (await run("SELECT * FROM `notice` WHERE `order` = ?", [order]))?.[0] ?? null;
            }
        }),
        /**
         * @param order
         * @param notice
         */
        editNotice: defineDBHandler<[number, Omit<Notice.Notice, 'writtenDate' | 'order'>], boolean>((order, notice) => {
            return async (run) => {
                const result = await run("UPDATE `notice` SET `title` = ?, `content` = ?, `type` = ?, `officialDate` = ? WHERE `order` = ?", [notice.title, notice.content, notice.type, notice.officialDate, order]);
                if (result.affectedRows === 0) {
                    return false;
                }
                return true;
            }
        }),
        /**@param order */
        deleteNotice: defineDBHandler<[number], void>((order) => {
            return async (run) => {
                await run("DELETE FROM `notice` WHERE `order` = ?", [order])
            }
        }),
        getRecentNotices: defineDBHandler<[], { wiki: Omit<Notice.Notice, 'content'>[], official: Omit<Notice.Notice, 'content'>[] }>(() => {
            return async (run) => {
                return {
                    wiki: await run("SELECT `order`, `title`, `type`, `writtenDate`, `officialDate` FROM `notice` WHERE `type` = 'wiki' ORDER BY `order` DESC LIMIT 0, 5"),
                    official: await run("SELECT `order`, `title`, `type`, `writtenDate`, `officialDate` FROM `notice` WHERE `type` = 'official' ORDER BY `order` DESC LIMIT 0, 5")
                }
            }
        })
    }
}

Notice.Server = NoticeServer;