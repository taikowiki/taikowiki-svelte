import { DAN } from "../song/const";
import type { DaniVersion } from "../song/types";
import type { Dani, DaniDBData, DaniUpdateData } from "./types";
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
    getVersions: defineDBHandler<[], Partial<DaniVersion>[]>(() => {
        return async (run) => {
            const result = (await run("SELECT `version` FROM `dani`")).map((e: any) => Object.values(e)[0]);
            return JSON.parse(JSON.stringify(result));
        }
    }),
    /**
     * Retrieves if version exists on db.
     */
    hasVersion: defineDBHandler<[string]>((version) => {
        return async(run) => {
            const result = await run("SELECT COUNT(`version`) FROM `dani` WHERE `version` = ?", [version]);
            if(Object.values(result[0])[0] === 0){
                return false;
            }
            else{
                return true;
            }
        }
    }),
    /**
     * Add Version
     */
    addVersion: defineDBHandler<[string, Dani[]?]>((version, danis) => {
        return async(run) => {
            await run("INSERT INTO `dani` (`version`, `data`) VALUES (?, ?)", [version, JSON.stringify(danis ?? [])])
        }
    }),
    /**
     * Update Version
     */
    updateVersion: defineDBHandler<[DaniUpdateData]>((updateData) => {
        updateData.data.sort((a, b) => {
            const aIndex = DAN.indexOf(a as any);
            const bIndex = DAN.indexOf(b as any);
    
            return bIndex - aIndex;
        });
        
        return async(run) => {
            await run("UPDATE `dani` SET `data` = ? WHERE `version` = ?", [JSON.stringify(updateData.data), updateData.version])
        }
    }),
}
