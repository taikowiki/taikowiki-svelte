import { runQuery } from "@sveltekit-board/db";
import type { DaniDBData } from "./types";

export default class DaniDB {
    static async getAll(): Promise<DaniDBData[]> {
        return await runQuery(async (run) => {
            const result = await run("SELECT * FROM `dani`");
            result.forEach((e: any) => {
                e.data = JSON.parse(e.data);
            })
            return JSON.parse(JSON.stringify(result))
        })
    }

    static async getByVersion(version: string): Promise<DaniDBData | null> {
        return await runQuery(async (run) => {
            const result = await run("SELECT * FROM `dani` WHERE `version` = ?", [version]);
            result.forEach((e: any) => {
                e.data = JSON.parse(e.data);
            })
            return JSON.parse(JSON.stringify(result))?.[0] ?? null
        })
    }

    static async getVersions(): Promise<string[]>{
        return await runQuery(async (run) => {
            const result = (await run("SELECT `version` FROM `dani`")).map((e:any) => Object.values(e)[0]);
            return JSON.parse(JSON.stringify(result));
        })
    }
}