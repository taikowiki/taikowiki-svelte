import { defineDBHandler } from "@yowza/db-handler";
import type { Notice } from "./types";

export const noticeDBController = {
    /**@param page*/
    getNoticeList: defineDBHandler<[number?], Omit<Notice, 'content'>[]>((page) => {
        return async(run) => {
            if(page){
                return await run("SELECT `order`, `title`, `type`, `writtenDate`, `officialDate` FROM `notice` ORDER BY `writtenDate` DESC LIMIT ?, 20", [(page - 1) * 20]);
            }
            else{
                return await run("SELECT `order`, `title`, `type`, `writtenDate`, `officialDate` FROM `notice` ORDER BY `writtenDate`");
            }
        }
    }),
    /**@param notice */
    writeNotice: defineDBHandler<[Omit<Notice, 'writtenDate' | 'order'>], number>(({title, content, type, officialDate}) => {
        return async(run) => {
            const result = await run("INSERT INTO `notice` (`title`, `content`, `type`, `officialDate`) VALUES (?, ?, ?, ?)", [title, content, type, officialDate]);
            return result.insertId;
        }
    }),
    countNotice: defineDBHandler<[], number>(() => {
        return async(run) => {
            const result = await run("SELECT COUNT(*) FROM `notice`");
            return Object.values(result[0])[0] as number;
        }
    }),
    /**@param order */
    getNoticeByOrder: defineDBHandler<[number], Notice | null>((order) => {
        return async(run) => {
            return (await run("SELECT * FROM `notice` WHERE `order` = ?", [order]))?.[0] ?? null;
        }
    }),
    /**
     * @param order
     * @param notice
     */
    editNotice: defineDBHandler<[number, Omit<Notice, 'writtenDate' | 'order'>], boolean>((order, notice) => {
        return async(run) => {
            const result = await run("UPDATE `notice` SET `title` = ?, `content` = ?, `type` = ?, `officialDate` = ? WHERE `order` = ?", [notice.title, notice.content, notice.type, notice.officialDate, order]);
            if(result.affectedRows === 0){
                return false;
            }
            return true;
        }
    }),
    /**@param order */
    deleteNotice: defineDBHandler<[number], void>((order) => {
        return async(run) => {
            await run("DELETE FROM `notice` WHERE `order` = ?", [order])
        }
    })
}