import { runQuery } from "@sveltekit-board/db";
import type { DiffChart, DiffchartData } from "./types";

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

    static async uploadDiffchart(diffchartData:DiffchartData){
        return await runQuery(async(run) => {
            let r = await run("SELECT `order` FROM `diffchart` WHERE `type` = ? AND `level` = ?", [diffchartData.type, diffchartData.level])

            if(r.length === 0){
                return await run("INSERT INTO `diffchart` (`name`, `level`, `type`, `data`) VALUES (?, ?, ?, ?)", [diffchartData.name, diffchartData.level, diffchartData.type, JSON.stringify(diffchartData.data)]);
            }
            else{
                return await run("UPDATE `diffchart` SET `name` = ?, `data` = ? WHERE `level` = ? AND `type` = ?", [diffchartData.name, JSON.stringify(diffchartData.data), diffchartData.level, diffchartData.type]);
            }
        })
    }

    static async deleteDiffchart(level:number, type:string){
        return await runQuery(async(run) => {
            return await run("DELETE FROM `diffchart` WHERE `level` = ? AND `type` = ?", [level, type])
        })
    }
}