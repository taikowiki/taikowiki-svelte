import { runQuery } from "@sveltekit-board/db";
import { escape, escapeId } from 'mysql2';
import { type SongData, type SongRequest, type SongSearchOption } from "./types";
//@ts-expect-error
import r from 'regex-escape';
function regexEscape(str: string): string {
    return r(str)
}

/**
 * db에서 불러온 songData를 SongData 타입에 맞게 파싱
 */
function parseSongDataFromDB(songDataFromDB: any) {
    if (songDataFromDB.courses) songDataFromDB.courses = JSON.parse(songDataFromDB.courses)
    if (songDataFromDB.bpm) songDataFromDB.bpm = JSON.parse(songDataFromDB.bpm);
    if (songDataFromDB.version) songDataFromDB.version = JSON.parse(songDataFromDB.version);
    if (songDataFromDB.genre) songDataFromDB.genre = JSON.parse(songDataFromDB.genre);
    if (songDataFromDB.artists) songDataFromDB.artists = JSON.parse(songDataFromDB.artists);
    if (songDataFromDB.courses && songDataFromDB.courses.ura === undefined) songDataFromDB.courses.ura = null;
    return songDataFromDB
}

export default class SongDB {
    static async createTable() {
        await runQuery(async (run) => {
            await run(`CREATE TABLE \`song\` (
                \`songNo\` tinytext NOT NULL,
                \`order\` int(11) NOT NULL,
                \`title\` text NOT NULL,
                \`titleKo\` text DEFAULT NULL,
                \`aliasKo\` text DEFAULT NULL,
                \`titleEn\` text DEFAULT NULL,
                \`aliasEn\` text DEFAULT NULL,
                \`bpm\` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(\`bpm\`)),
                \`bpmShiver\` tinyint(1) NOT NULL,
                \`version\` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(\`version\`)),
                \`isAsiaBanned\` tinyint(1) NOT NULL,
                \`isKrBanned\` tinyint(1) NOT NULL,
                \`genre\` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(\`genre\`)),
                \`artists\` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(\`artists\`)),
                \`addedDate\` bigint(20) NOT NULL,
                \`courses\` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(\`courses\`)),
                \`isDeleted\` tinyint(1) NOT NULL DEFAULT 0
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
            `);
            await run(`ALTER TABLE \`song\` ADD PRIMARY KEY (\`order\`);`);
            await run("ALTER TABLE `song` MODIFY `order` int(11) NOT NULL AUTO_INCREMENT;");
        })
    }

    static async getAll(): Promise<SongData[]>
    static async getAll<T extends Partial<SongData> = Partial<SongData>>(columns: string[]): Promise<T[]>
    static async getAll(columns?: string[]) {
        let columnsQuery = '*';
        if (columns) {
            columnsQuery = columns.map(e => escapeId(e)).join(', ');
        }

        return await runQuery(async (run) => {
            let result = await run(`SELECT ${columnsQuery} FROM \`song\` ORDER BY \`addedDate\` DESC;`);
            result.forEach(parseSongDataFromDB)
            return JSON.parse(JSON.stringify(result))
        })
    }

    static async getBySongNo(songNo: string): Promise<SongData | null>;
    static async getBySongNo(songNos: string[]): Promise<SongData[]>;
    static async getBySongNo<T extends Partial<SongData> = Partial<SongData>>(songNo: string, columns: string[]): Promise<T | null>;
    static async getBySongNo<T extends Partial<SongData> = Partial<SongData>>(songNos: string[], columns: string[]): Promise<T[]>;
    static async getBySongNo(songNo: string | string[], columns?: string[]) {
        let columnsQuery = '*';
        if (columns) {
            columnsQuery = columns.map(e => escapeId(e)).join(', ');
        }

        if (typeof (songNo) === "string") {
            return await runQuery(async (run) => {
                let result = await run(`SELECT ${columnsQuery} FROM \`song\` WHERE \`songNo\` = ?`, [songNo]);
                result.forEach(parseSongDataFromDB);
                return (JSON.parse(JSON.stringify(result)) as SongData[])[0] ?? null;
            })
        }
        else if (songNo.length === 0) {
            return [];
        }
        else {
            return await runQuery(async (run) => {
                let result = await run(`SELECT ${columnsQuery} FROM \`song\` WHERE \`songNo\` IN (${songNo.map(() => '?').join(', ')})`, [...songNo]);
                result.forEach(parseSongDataFromDB);
                return JSON.parse(JSON.stringify(result));
            })
        }
    }

    static async search(page: number | null, option?: SongSearchOption): Promise<{
        songs: (SongData & { order: number })[],
        count: number
    }>
    static async search<T extends Partial<SongData & { order: number }> = Partial<SongData>>(page: number | null, option: SongSearchOption | undefined, columns?: string[]): Promise<{
        songs: T[],
        count: number
    }>;
    static async search(page: number | null, option: SongSearchOption | undefined = undefined, columns?: string[]) {
        let sqlWhereQuery = "WHERE (1)";
        if (option?.difficulty && option?.level) {
            if (option.difficulty === "oniura") {
                sqlWhereQuery += `AND (JSON_EXTRACT(\`courses\`, '$.oni.level') = ${option.level} OR JSON_EXTRACT(\`courses\`, '$.ura.level') = ${option.level})`;
            }
            else {
                sqlWhereQuery += `AND (JSON_EXTRACT(\`courses\`, '$.${option.difficulty}.level') = ${option.level})`;
            }
        }
        if (option?.genre) {
            sqlWhereQuery += `AND (JSON_CONTAINS(\`genre\`, '"${option.genre}"'))`;
        }
        if (option?.query) {
            const regexp = `${option.query.split(' ').map(regexEscape).join('.*?')}`
            sqlWhereQuery += `AND (\`title\` REGEXP ${escape(regexp)} OR \`titleKo\` REGEXP ${escape(regexp)} OR \`aliasKo\` REGEXP ${escape(regexp)})`
        }

        let columnsQuery = '*';
        if (columns) {
            columnsQuery = columns.map(e => escapeId(e)).join(', ')
        }

        return await runQuery(async (run) => {
            const songs = (page === null || page < 1) ? await run(`SELECT ${columnsQuery} FROM \`song\` ${sqlWhereQuery} ORDER BY \`addedDate\` DESC`) : await run(`SELECT ${columnsQuery} FROM \`song\` ${sqlWhereQuery} ORDER BY \`addedDate\` DESC LIMIT ${(page - 1) * 30}, 30`);
            songs.forEach(parseSongDataFromDB);
            const count = Object.values((await run(`SELECT COUNT(\`order\`) FROM \`song\` ${sqlWhereQuery}`))[0])?.[0] ?? 0
            return {
                songs: JSON.parse(JSON.stringify(songs)),
                count
            };
        })
    }

    static async addSong(data: SongData) {
        return await runQuery(async (run) => {
            return await run(`INSERT INTO \`song\` (
                \`songNo\`, 
                \`title\`,
                \`titleKo\`,
                \`aliasKo\`,
                \`titleEn\`,
                \`aliasEn\`,
                \`bpm\`,
                \`bpmShiver\`,
                \`version\`,
                \`isAsiaBanned\`,
                \`isKrBanned\`,
                \`genre\`,
                \`artists\`,
                \`addedDate\`,
                \`courses\`
            ) VALUES (
                ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
            )`, [
                data.songNo,
                data.title,
                data.titleKo,
                data.aliasKo,
                data.titleEn,
                data.aliasEn,
                JSON.stringify(data.bpm),
                data.bpmShiver,
                JSON.stringify(data.version),
                data.isAsiaBanned,
                data.isKrBanned,
                JSON.stringify(data.genre),
                JSON.stringify(data.artists),
                data.addedDate || 0,
                JSON.stringify(data.courses)
            ])
        })
    }

    static async getUpdateTime(): Promise<number> {
        let result = await runQuery(async (run) => {
            return run(`SELECT \`UPDATE_TIME\` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '${process.env.DB_DATABASE}' AND TABLE_NAME = 'song';`);
        })

        const updateTime = new Date(result[0]['UPDATE_TIME']).getTime();

        return updateTime;
    }

    static async getCreateTime(): Promise<number> {
        let result = await runQuery(async (run) => {
            return run(`SELECT \`CREATE_TIME\` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '${process.env.DB_DATABASE}' AND TABLE_NAME = 'song';`);
        })

        const updateTime = new Date(result[0]['CREATE_TIME']).getTime();

        return updateTime;
    }

    static async getNewSongs(limit: number = 3): Promise<SongData[]> {
        return await runQuery(async (run) => {
            let result = await run(`SELECT * FROM \`song\` ORDER BY \`addedDate\` DESC LIMIT ${limit}`);
            result.forEach(parseSongDataFromDB);
            return JSON.parse(JSON.stringify(result))
        })
    }

    static async uploadSong(songData: SongData) {
        const song = await this.getBySongNo(songData.songNo);
        return await runQuery(async (run) => {
            if (song === null) {
                await run("INSERT INTO `song` (`songNo`, `title`, `titleKo`, `aliasKo`, `titleEn`, `aliasEn`, `bpm`, `bpmShiver`, `version`, `isAsiaBanned`, `isKrBanned`, `genre`, `artists`, `addedDate`, `courses`, `isDeleted`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [songData.songNo, songData.title, songData.titleKo, songData.aliasKo, songData.titleEn, songData.aliasEn, JSON.stringify(songData.bpm), songData.bpmShiver, JSON.stringify(songData.version), songData.isAsiaBanned, songData.isKrBanned, JSON.stringify(songData.genre), JSON.stringify(songData.artists), songData.addedDate, JSON.stringify(songData.courses), songData.isDeleted])
            }
            else {
                await run("UPDATE `song` SET `title` = ?, `titleKo` = ?, `aliasKo` = ?, `titleEn` = ?, `aliasEn` = ?, `bpm` = ?, `bpmShiver` = ?, `version` = ?, `isAsiaBanned` = ?, `isKrBanned` = ?, `genre` = ?, `artists` = ?, `addedDate` = ?, `courses` = ?, `isDeleted` = ? WHERE `songNo` = ?", [songData.title, songData.titleKo, songData.aliasKo, songData.titleEn, songData.aliasEn, JSON.stringify(songData.bpm), songData.bpmShiver, JSON.stringify(songData.version), songData.isAsiaBanned, songData.isKrBanned, JSON.stringify(songData.genre), JSON.stringify(songData.artists), songData.addedDate, JSON.stringify(songData.courses), songData.isDeleted, songData.songNo])
            }

            await run("INSERT INTO `song/log` (`songNo`, `before`, `after`, `updatedTime`) VALUES (?, ?, ?, ?)", [songData.songNo, song ? JSON.stringify(song) : null, JSON.stringify(songData), Date.now()]);
        })
    }
}

export class SongRequestController {
    static async getAll(status?: SongRequest['status']): Promise<(SongRequest & { order: number })[]> {
        return await runQuery(async (run) => {
            if (status) {
                return (await run("SELECT * FROM `song/request` WHERE `status` = ? ORDER BY createdTime DESC", [status])).map((request: any) => {
                    request.data = JSON.parse(request.data);
                    return request;
                })
            }
            else {
                return (await run("SELECT * FROM `song/request` ORDER BY createdTime DESC")).map((request: any) => {
                    request.data = JSON.parse(request.data);
                    return request;
                })
            }
        })
    }

    static async getRequestsBySongNo(songNo: string, status?: SongRequest['status']): Promise<(SongRequest & { order: number })[]> {
        return await runQuery(async (run) => {
            if (status) {
                return (await run("SELECT * FROM `song/request` WHERE `songNo` = ? AND `status` = ? ORDER BY createdTime DESC", [songNo, status])).map((request: any) => {
                    request.data = JSON.parse(request.data);
                    return request;
                })
            }
            else {
                return (await run("SELECT * FROM `song/request` WHERE `songNo` = ? ORDER BY createdTime DESC", [songNo])).map((request: any) => {
                    request.data = JSON.parse(request.data);
                    return request;
                })
            }
        })
    }

    static async getRequestByOrder(order: number, status?: SongRequest['status']): Promise<(SongRequest & { order: number }) | null> {
        return await runQuery(async (run) => {
            let result
            if (status) {
                result = await run("SELECT * FROM `song/request` WHERE `order` = ? AND `status` = ? ORDER BY createdTime DESC", [order, status]);
            }
            else {
                result = await run("SELECT * FROM `song/request` WHERE `order` = ? ORDER BY createdTime DESC", [order]);
            }
            if (result.length === 0) return null;

            const request = result[0];
            request.data = JSON.parse(request.data);

            return request;
        })
    }

    static async createRequest(request: {
        UUID: string;
        songNo: string;
        data: SongData;
        ip: string;
    }) {
        const song = await SongDB.getBySongNo(request.songNo);

        if (song !== null) {//새곡아님
            return await runQuery(async (run) => {
                await run(`INSERT INTO \`song/request\` (\`UUID\`, \`ip\`, \`songNo\`, \`createdTime\`, \`type\`, \`data\`) VALUES (?, ?, ?, ?, ?, ?)`, [request.UUID, request.ip, request.songNo, Date.now(), 'edit', JSON.stringify(request.data)])
            })
        }
        else {//새곡임
            return await runQuery(async (run) => {
                await run(`INSERT INTO \`song/request\` (\`UUID\`, \`ip\`, \`songNo\`, \`createdTime\`, \`type\`, \`data\`) VALUES (?, ?, ?, ?, ?, ?)`, [request.UUID, request.ip, request.songNo, Date.now(), 'new', JSON.stringify(request.data)])
            })
        }
    }

    static async approve(order: number) {
        const songRequest = await this.getRequestByOrder(order)
        if (!songRequest) return;
        const { data } = songRequest;
        await SongDB.uploadSong(data);
        return await runQuery(async (run) => {
            await run("UPDATE `song/request` SET `status` = 'approved' WHERE `order` = ?", [order])
        })
    }

    static async disapprove(order: number | number[]) {
        return await runQuery(async (run) => {
            if (Array.isArray(order)) {
                await run(`UPDATE \`song/request\` SET \`status\` = 'disapproved' WHERE \`order\` IN (${order.map(escape).join(', ')})`)
            }
            else {
                await run("UPDATE `song/request` SET `status` = 'disapproved' WHERE `order` = ?", [order])
            }
        })
    }

    static async removeRequest(order: number) {
        return await runQuery(async (run) => {
            return await run("DELETE FROM `song/request` WHERE `order` = ?", [order]);
        })
    }
}

/*
export interface SongSearchOption {
    title?: string;
    difficulty?: Difficulty;
    level?: number;
}
*/

