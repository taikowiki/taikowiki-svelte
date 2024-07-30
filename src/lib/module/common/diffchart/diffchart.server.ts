import type { DiffChart, DiffchartData } from "./types";
import { defineDBHandler } from "@yowza/db-handler";

export const diffchartDBController = {
    /**
     * 레벨에 따라 클리어 서열표 데이터를 가져옵니다.
     */
    getClearByLevel: defineDBHandler<[number], DiffChart | null>((level) => {
        return async (run) => {
            const result = await run("SELECT `data` FROM `diffchart` WHERE `type` = 'clear' AND `level` = ?", [level]);

            if (result[0]?.data === undefined) {
                return null;
            }
            return JSON.parse(result[0].data)
        }
    }),
    /**
     * 모든 서열표 데이터를 가져옵니다.
     */
    getAll: defineDBHandler<[], { name: string, level: number, type: string, data: DiffChart }[]>(() => {
        return async (run) => {
            const result = await run("SELECT * FROM `diffchart`;");

            result.forEach((e: any) => {
                e.data = JSON.parse(e.data);
            })

            return result
        }
    }),
    /**
     * 서열표 데이터를 업로드합니다.
     * 기존 서열표가 존재하면 업데이트하고, 존재하지 않으면 새로 생성합니다.
     */
    uploadDiffchart: defineDBHandler<[DiffchartData], void>((diffchartData) => {
        return async (run) => {
            let r = await run("SELECT `order` FROM `diffchart` WHERE `type` = ? AND `level` = ?", [diffchartData.type, diffchartData.level])

            if (r.length === 0) {
                return await run("INSERT INTO `diffchart` (`name`, `level`, `type`, `data`) VALUES (?, ?, ?, ?)", [diffchartData.name, diffchartData.level, diffchartData.type, JSON.stringify(diffchartData.data)]);
            }
            else {
                return await run("UPDATE `diffchart` SET `name` = ?, `data` = ? WHERE `level` = ? AND `type` = ?", [diffchartData.name, JSON.stringify(diffchartData.data), diffchartData.level, diffchartData.type]);
            }
        }
    }),
    /**
     * 서열표 데이터를 삭제합니다.
     */
    deleteDiffchart: defineDBHandler<[number, string], void>((level, type) => {
        return async (run) => {
            await run("DELETE FROM `diffchart` WHERE `level` = ? AND `type` = ?", [level, type])
        }
    })
}