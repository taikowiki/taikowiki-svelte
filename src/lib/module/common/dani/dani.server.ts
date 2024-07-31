import type { DaniDBData } from "./types";
import { defineDBHandler } from "@yowza/db-handler";

export const daniDBController = {
    /**
     * Retrieves all dani data.
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
     * Retrieves all dani data for a specific version.
     */
    getByVersion: defineDBHandler<[string], DaniDBData | null>((version) => {
        return async (run) => {
            const result = await run("SELECT * FROM `dani` WHERE `version` = ?", [version]);
            result.forEach((e: any) => {
                e.data = JSON.parse(e.data);
            })
            return JSON.parse(JSON.stringify(result))?.[0] ?? null
        }
    }),
    /**
     * Retrieves versions.
     */
    getVersions: defineDBHandler<[], string[]>(() => {
        return async (run) => {
            const result = (await run("SELECT `version` FROM `dani`")).map((e: any) => Object.values(e)[0]);
            return JSON.parse(JSON.stringify(result));
        }
    })
}
