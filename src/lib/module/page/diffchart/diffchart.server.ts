import { runQuery } from "@sveltekit-board/db";
import type { DiffChart } from "./types";

export async function getClearByLevel(level: number): Promise<DiffChart> {
    const result = await runQuery(async (run) => {
        return await run("SELECT `data` FROM `diffchart` WHERE `type` = 'clear' AND `level` = ?", [level])
    })

    if (result?.[0]?.data === undefined) {
        throw new Error('Data Is Null');
    }
    return JSON.parse(result[0].data);
}