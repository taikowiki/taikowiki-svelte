import { runQuery } from "@sveltekit-board/db";
import type { DiffChart } from "./types";

export default class DiffchartDB {
    static async getClearByLevel(level: number): Promise<DiffChart> {
        const result = await runQuery(async (run) => {
            return await run("SELECT `data` FROM `diffchart` WHERE `type` = 'clear' AND `level` = ?", [level])
        })

        if (result?.[0]?.data === undefined) {
            throw new Error('Data Is Null');
        }
        return JSON.parse(result[0].data);
    }

    static async getAll(): Promise<{ name: string, level: number, type: string, data: DiffChart }[]> {
        return JSON.parse(JSON.stringify((await runQuery(async (run) => await run("SELECT * FROM `diffchart`;"))).map((e: any) => {
            e.data = JSON.parse(e.data);
            return e;
        })));
    }
}