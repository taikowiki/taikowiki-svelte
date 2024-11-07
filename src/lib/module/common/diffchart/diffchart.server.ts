import type { DiffChart, DiffchartData } from "./types";
import { defineDBHandler } from "@yowza/db-handler";

export const diffchartDBController = {
    /**
     * Retrieves the clear difficulty chart data by level.
     */
    getClearByLevel: defineDBHandler<[number], DiffchartData | null>((level) => {
        return async (run) => {
            const result = await run("SELECT * FROM `diffchart` WHERE `type` = 'clear' AND `level` = ?", [level]);

            if (result[0]?.data === undefined) {
                return null;
            }

            result.forEach(parseDiffchart);
            
            return result[0];
        }
    }),
    /**
     * Retrieves the fullcombo difficulty chart data by level.
     */
    getFullcomboByLevel: defineDBHandler<[number], DiffchartData | null>((level) => {
        return async (run) => {
            const result = await run("SELECT * FROM `diffchart` WHERE `type` = 'fc' AND `level` = ?", [level]);

            if (result[0]?.data === undefined) {
                return null;
            }

            result.forEach(parseDiffchart);
            
            return result[0];
        }
    }),
    /**
     * Retrieves all difficulty chart data.
     */
    getAll: defineDBHandler<[], DiffchartData[]>(() => {
        return async (run) => {
            const result = await run("SELECT * FROM `diffchart`;");

            result.forEach(parseDiffchart);
            result.sort(sortDiffchart);

            return result;
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
                return await run("INSERT INTO `diffchart` (`name`, `level`, `type`, `data`, `comment`) VALUES (?, ?, ?, ?, ?)", [diffchartData.name, diffchartData.level, diffchartData.type, JSON.stringify(diffchartData.data), diffchartData.comment ?? null]);
            }
            else {
                return await run("UPDATE `diffchart` SET `name` = ?, `data` = ?, `comment` = ? WHERE `level` = ? AND `type` = ?", [diffchartData.name, JSON.stringify(diffchartData.data), diffchartData.comment ?? null, diffchartData.level, diffchartData.type]);
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


function parseDiffchart(e: any){
    e.data &&= JSON.parse(e.data);
}

function sortDiffchart(a: DiffchartData, b: DiffchartData){
    if(a.type === b.type){
        return a.level - b.level
    }
    else{
        return typeToNum(a.type) - typeToNum(b.type);
    }
}
function typeToNum(type: 'clear' | 'fc' | 'dfc'){
    switch(type){
        case('clear'):{
            return 0;
        }
        case('fc'):{
            return 1;
        }
        case('dfc'):{
            return 2;
        }
        default:{
            return 3;
        }
    }
}