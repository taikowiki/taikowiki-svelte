import { escape, escapeId } from 'mysql2';
import { type SongData, type SongRequest, type SongSearchOption } from "./types";
//@ts-expect-error
import r from 'regex-escape';
import { defineDBHandler } from "@yowza/db-handler";
import { escapeString } from '../escape';
function regexEscape(str: string): string {
    return r(str)
}

/**
 * Parse songData fetched from the database to match the SongData type
 */
function parseSongDataFromDB(songDataFromDB: any) {
    songDataFromDB.courses &&= JSON.parse(songDataFromDB.courses)
    songDataFromDB.courses && (songDataFromDB.courses.ura ??= null)
    songDataFromDB.bpm &&= JSON.parse(songDataFromDB.bpm)
    songDataFromDB.version &&= JSON.parse(songDataFromDB.version)
    songDataFromDB.genre &&= JSON.parse(songDataFromDB.genre)
    songDataFromDB.artists &&= JSON.parse(songDataFromDB.artists)
}

export const songDBController = {
    /**
     * Function to create the song table
     */
    createTable: defineDBHandler<[], void>(() => {
        return async (run) => {
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
        }
    }),

    /**
     * Retrieve data of all songs.
     */
    getAll: defineDBHandler<[], SongData[]>(() => {
        let columnsQuery = '*';

        return async (run) => {
            let result = await run(`SELECT ${columnsQuery} FROM \`song\` ORDER BY \`addedDate\` DESC;`);
            result.forEach(parseSongDataFromDB)
            return JSON.parse(JSON.stringify(result))
        }
    }),

    /**
     * Retrieve data of specific columns for all songs.
     */
    getAllColumns: defineDBHandler<[string[]], Partial<SongData>[]>((columns) => {
        const columnsQuery = columns.map(e => escapeId(e)).join(', ');
        return async (run) => {
            let result = await run(`SELECT ${columnsQuery} FROM \`song\` ORDER BY \`addedDate\` DESC;`);
            result.forEach(parseSongDataFromDB)
            return JSON.parse(JSON.stringify(result))
        }
    }),

    /**
     * Retrieve song data changed after a specific time.
     */
    getAfter: defineDBHandler<[number], SongData[]>((after) => {
        return async (run) => {
            const result = await run("SELECT `songNo` FROM `song/log` WHERE `updatedTime` >= ?", [after]);

            const songNos = [...new Set(result.map((e: any) => e.songNo))];

            const r: SongData[] = await songDBController.getSongsBySongNo.getCallback(songNos as string[])(run);

            return r;
        }
    }),

    /**
     * Retrieve data of a song by its songNo.
     */
    getSongBySongNo: defineDBHandler<[string], SongData | null>((songNo) => {
        return async (run) => {
            let columnsQuery = '*';
            let result = await run(`SELECT ${columnsQuery} FROM \`song\` WHERE \`songNo\` = ?`, [songNo]);
            result.forEach(parseSongDataFromDB);
            return (JSON.parse(JSON.stringify(result)) as SongData[])[0] ?? null;
        }
    }),
    /**
     * Retrieve specific columns of a song by its songNo.
     */
    getSongColumnsBySongNo: defineDBHandler<[string, string[]], Partial<SongData> | null>((songNo, columns) => {
        return async (run) => {
            const columnsQuery = columns.map(escapeId).join(', ');
            let result = await run(`SELECT ${columnsQuery} FROM \`song\` WHERE \`songNo\` = ?`, [songNo]);
            result.forEach(parseSongDataFromDB);
            return (JSON.parse(JSON.stringify(result)) as SongData[])[0] ?? null;
        }
    }),
    /**
     * Retrieve data of multiple songs by their songNos.
     */
    getSongsBySongNo: defineDBHandler<[string[]], SongData[]>((songNo) => {
        return async (run) => {
            if (songNo.length === 0) {
                return [];
            }

            const columnsQuery = '*';
            let result = await run(`SELECT ${columnsQuery} FROM \`song\` WHERE \`songNo\` IN (${[...songNo].fill('?').join(', ')})`, [...songNo]);
            result.forEach(parseSongDataFromDB);
            return JSON.parse(JSON.stringify(result));
        }
    }),
    /**
     * Retrieve specific columns of multiple songs by their songNos.
     */
    getSongsColumnsBySongNo: defineDBHandler<[string[], string[]], Partial<SongData>[]>((songNo, columns) => {
        return async (run) => {
            if (songNo.length === 0) {
                return [];
            }

            const columnsQuery = columns.map(escapeId).join(', ');
            let result = await run(`SELECT ${columnsQuery} FROM \`song\` WHERE \`songNo\` IN (${[...songNo].fill('?').join(', ')})`, [...songNo]);
            result.forEach(parseSongDataFromDB);
            return JSON.parse(JSON.stringify(result));
        }
    }),

    /**
     * Search and retrieve song data.
     */
    search: defineDBHandler<[number | null, SongSearchOption?], { songs: (SongData & { order: number })[], count: number }>((page, option) => {
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
            const query = `%${option.query.split(' ').map(escapeString).join('%')}%`
            sqlWhereQuery += `AND (\`title\` LIKE ${escape(query)} OR \`titleKo\` LIKE ${escape(query)} OR \`aliasKo\` LIKE ${escape(query)})`
        }

        const columnsQuery = '*';

        return async (run) => {
            const songs = (page === null || page < 1) ? await run(`SELECT ${columnsQuery} FROM \`song\` ${sqlWhereQuery} ORDER BY \`addedDate\` DESC`) : await run(`SELECT ${columnsQuery} FROM \`song\` ${sqlWhereQuery} ORDER BY \`addedDate\` DESC LIMIT ${(page - 1) * 30}, 30`);
            songs.forEach(parseSongDataFromDB);
            const count = Object.values((await run(`SELECT COUNT(\`order\`) FROM \`song\` ${sqlWhereQuery}`))[0])?.[0] as number ?? 0
            return {
                songs: JSON.parse(JSON.stringify(songs)),
                count
            }
        };
    }),

    /**
    * Retrieves specific columns of song data.
    */
    searchColumns: defineDBHandler<[number | null, string[], SongSearchOption?], { songs: Partial<(SongData & { order: number })>[], count: number }>((page, columns, option) => {
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
            const query = `%${option.query.split(' ').map(escapeString).join('%')}%`
            sqlWhereQuery += `AND (\`title\` LIKE ${escape(query)} OR \`titleKo\` LIKE ${escape(query)} OR \`aliasKo\` LIKE ${escape(query)})`
        }

        const columnsQuery = columns.map(escapeId).join(', ')

        return async (run) => {
            const songs = (page === null || page < 1) ? await run(`SELECT ${columnsQuery} FROM \`song\` ${sqlWhereQuery} ORDER BY \`addedDate\` DESC`) : await run(`SELECT ${columnsQuery} FROM \`song\` ${sqlWhereQuery} ORDER BY \`addedDate\` DESC LIMIT ${(page - 1) * 30}, 30`);
            songs.forEach(parseSongDataFromDB);
            const count = Object.values((await run(`SELECT COUNT(\`order\`) FROM \`song\` ${sqlWhereQuery}`))[0])?.[0] as number ?? 0
            return {
                songs: JSON.parse(JSON.stringify(songs)),
                count
            }
        };
    }),

    /**
     * Adds a song.
     */
    addSong: defineDBHandler<[SongData], void>((data) => {
        return async (run) => {
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
        }
    }),

    /**
     * Retrieves the most recent update time.
     */
    getUpdateTime: defineDBHandler<[], number>(() => {
        return async (run) => {
            const result = await run(`SELECT \`UPDATE_TIME\` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '${process.env.DB_DATABASE}' AND TABLE_NAME = 'song';`);
            const updateTime = new Date(result[0]['UPDATE_TIME']).getTime();
            return updateTime;
        }
    }),

    /**
     * Retrieves the table creation time.
     */
    getCreateTime: defineDBHandler<[], number>(() => {
        return async (run) => {
            let result = await run(`SELECT \`CREATE_TIME\` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '${process.env.DB_DATABASE}' AND TABLE_NAME = 'song';`);

            const updateTime = new Date(result[0]['CREATE_TIME']).getTime();

            return updateTime;
        }
    }),

    /**
     * Retrieves the most recently added songs based on the `addedDate` column, not the update time.
     */
    getNewSongs: defineDBHandler<[number], SongData[]>((limit = 3) => {
        return async (run) => {
            let result = await run(`SELECT \`title\`, \`songNo\` FROM \`song\` ORDER BY \`addedDate\` DESC LIMIT ${limit}`);
            result.forEach(parseSongDataFromDB);
            return JSON.parse(JSON.stringify(result))
        }
    }),

    /**
     * Upload Image
     */
    uploadLink: async (url: string) => {
        const req = defineRequestHandler<string, { fileName: string }>({
            url: 'https://file.taiko.wiki/upload/link',
            method: 'post'
        })
        return await req(JSON.stringify({
            url,
            key: process.env.FILE_API_KEY
        }));
    },

    /**
     * Updates a song.
     */
    uploadSong: defineDBHandler<[string, SongData], void>((songNo, songData) => {
        return async (run) => {
            for (const course of Object.values(songData.courses)) {
                if (!course) continue;
                for (let i = 0; i < course.images.length; i++) {
                    const url = course.images[i];
                    if (!url.startsWith('https://file.taiko.wiki')) {
                        const response = await songDBController.uploadLink(url);
                        if (response.status === "success") {
                            course.images[i] = `https://file.taiko.wiki/img/${response.data.fileName}`;
                        }
                    }
                }
            }
            const song = await songDBController.getSongBySongNo.getCallback(songNo)(run);
            if (song === null) {
                await run("INSERT INTO `song` (`songNo`, `title`, `titleKo`, `aliasKo`, `titleEn`, `aliasEn`, `bpm`, `bpmShiver`, `version`, `isAsiaBanned`, `isKrBanned`, `genre`, `artists`, `addedDate`, `courses`, `isDeleted`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [songData.songNo, songData.title, songData.titleKo, songData.aliasKo, songData.titleEn, songData.aliasEn, JSON.stringify(songData.bpm), songData.bpmShiver, JSON.stringify(songData.version), songData.isAsiaBanned, songData.isKrBanned, JSON.stringify(songData.genre), JSON.stringify(songData.artists), songData.addedDate, JSON.stringify(songData.courses), songData.isDeleted])
            }
            else {
                await run("UPDATE `song` SET `songNo` = ?, `title` = ?, `titleKo` = ?, `aliasKo` = ?, `titleEn` = ?, `aliasEn` = ?, `bpm` = ?, `bpmShiver` = ?, `version` = ?, `isAsiaBanned` = ?, `isKrBanned` = ?, `genre` = ?, `artists` = ?, `addedDate` = ?, `courses` = ?, `isDeleted` = ? WHERE `songNo` = ?", [songData.songNo, songData.title, songData.titleKo, songData.aliasKo, songData.titleEn, songData.aliasEn, JSON.stringify(songData.bpm), songData.bpmShiver, JSON.stringify(songData.version), songData.isAsiaBanned, songData.isKrBanned, JSON.stringify(songData.genre), JSON.stringify(songData.artists), songData.addedDate, JSON.stringify(songData.courses), songData.isDeleted, songNo])
            }

            await run("INSERT INTO `song/log` (`songNo`, `before`, `after`, `updatedTime`) VALUES (?, ?, ?, ?)", [songData.songNo, song ? JSON.stringify(song) : null, JSON.stringify(songData), Date.now()]);
        }
    })
}

export const songRequestDBController = {
    /**
     * Retrieves all requests.
     */
    getAll: defineDBHandler<[SongRequest['status']?], (SongRequest & { order: number })[]>((status) => {
        return async (run) => {
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
        }
    }),

    /**
     * Retrieves requests for a specific songNo.
     */
    getRequestsBySongNo: defineDBHandler<[string, SongRequest['status']?], (SongRequest & { order: number })[]>((songNo, status) => {
        return async (run) => {
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
        }
    }),

    /**
     * Retrieves the request for a specific order.
     */
    getRequestByOrder: defineDBHandler<[number, SongRequest['status']?]>((order, status) => {
        return async (run) => {
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
        }
    }),

    /**
     * Create a song request
     */
    createRequest: defineDBHandler<[{ UUID: string; songNo: string; data: SongData; ip: string; }], void>((request) => {
        return async (run) => {
            const song = await songDBController.getSongBySongNo.getCallback(request.songNo)(run);

            if (song !== null) {//새곡아님
                return await run(`INSERT INTO \`song/request\` (\`UUID\`, \`ip\`, \`songNo\`, \`createdTime\`, \`type\`, \`data\`) VALUES (?, ?, ?, ?, ?, ?)`, [request.UUID, request.ip, request.songNo, Date.now(), 'edit', JSON.stringify(request.data)])
            }
            else {//새곡임
                return await run(`INSERT INTO \`song/request\` (\`UUID\`, \`ip\`, \`songNo\`, \`createdTime\`, \`type\`, \`data\`) VALUES (?, ?, ?, ?, ?, ?)`, [request.UUID, request.ip, request.songNo, Date.now(), 'new', JSON.stringify(request.data)])
            }
        }
    }),

    /**
     * Approve a song request
     */
    approve: defineDBHandler<[number, SongData?], void>((order, editedData) => {
        return async (run) => {
            const songRequest = await songRequestDBController.getRequestByOrder.getCallback(order)(run)
            if (!songRequest) return;
            const { data } = songRequest;
            await songDBController.uploadSong.getCallback(songRequest.songNo, editedData ?? data)(run);
            await run("UPDATE `song/request` SET `status` = 'approved' WHERE `order` = ?", [order])
        }
    }),

    /** 
     * Disapprove a song request
    */
    disapprove: defineDBHandler<[number | number[]], void>((order) => {
        return async (run) => {
            if (Array.isArray(order)) {
                await run(`UPDATE \`song/request\` SET \`status\` = 'disapproved' WHERE \`order\` IN (${order.map(escape).join(', ')})`)
            }
            else {
                await run("UPDATE `song/request` SET `status` = 'disapproved' WHERE `order` = ?", [order])
            }
        }
    }),

    /**
     * Delete a song request
     */
    removeRequest: defineDBHandler<[number], void>((order) => {
        return async (run) => {
            return await run("DELETE FROM `song/request` WHERE `order` = ?", [order]);
        }
    })
}

/*
export interface SongSearchOption {
    title?: string;
    difficulty?: Difficulty;
    level?: number;
}
*/