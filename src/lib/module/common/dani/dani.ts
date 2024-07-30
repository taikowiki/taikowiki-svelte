import type { DaniDBData } from "./types";
import { defineDBHandler } from "@yowza/db-handler";

export const daniDBController = {
    /**
     * 모든 단위 데이터를 가져옵니다.
     */
    getAll: defineDBHandler<[], DaniDBData[]>(() => {
        return async (run) => {
            const result = await run("SELECT * FROM `dani`");
            result.forEach((e: any) => {
                e.data = JSON.parse(e.data);
            })
            return JSON.parse(JSON.stringify(result));
        }
    }),
    /**
     * 특정 버전의 모든 단위 데이터를 가져옵니다.
     */
    getByVersion: defineDBHandler<[string], [DaniDBData | null]>((version) => {
        return async (run) => {
            const result = await run("SELECT * FROM `dani` WHERE `version` = ?", [version]);
            result.forEach((e: any) => {
                e.data = JSON.parse(e.data);
            })
            return JSON.parse(JSON.stringify(result))?.[0] ?? null
        }
    }),
    /**
     * 버전들을 가져옵니다.
     */
    getVersions: defineDBHandler<[], string[]>(() => {
        return async (run) => {
            const result = (await run("SELECT `version` FROM `dani`")).map((e: any) => Object.values(e)[0]);
            return JSON.parse(JSON.stringify(result));
        }
    })
}