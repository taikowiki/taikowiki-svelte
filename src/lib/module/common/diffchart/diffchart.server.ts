import type { DiffChart, DiffchartData } from "./types";
import { defineDBHandler } from "@yowza/db-handler";

export const diffchartDBController = {
    /**
     * Retrieves the clear difficulty chart data by level.
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
     * Retrieves all difficulty chart data.
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
     * Uploads difficulty chart data.
     * Updates existing difficulty charts or creates new ones if they do not exist.
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
     * Deletes difficulty chart data.
     */
    deleteDiffchart: defineDBHandler<[number, string], void>((level, type) => {
        return async (run) => {
            await run("DELETE FROM `diffchart` WHERE `level` = ? AND `type` = ?", [level, type])
        }
    })
}
