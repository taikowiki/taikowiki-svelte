import { escape, escapeId } from 'mysql2';
import { Song } from '$lib/module/song';
import { defineDBHandler } from "@yowza/db-handler";
import { Util } from '$lib/module/util';
import '$lib/module/util/util.server.js';

type SongData = Song.SongData;
type SongRequest = Song.SongRequest;
type SongSearchOption = Song.SongSearchOption;

const titleColumns = ['title', 'titleKo', 'titleEn', 'titleZhCN', 'romaji'] as const;
const aliasColumns = ['aliasKo', 'aliasEn'] as const;

namespace SongServer {
    export const DBController = {
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

                const r: SongData[] = await DBController.getSongsBySongNo.getCallback(songNos as string[])(run);

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
        getSongColumnsBySongNo: defineDBHandler<[songNo: string, columns: (keyof SongData | "order")[]], Partial<SongData> | null>((songNo, columns) => {
            return async (run) => {
                const columnsQuery = columns.map((e) => escapeId(e)).join(', ');
                let result = await run(`SELECT ${columnsQuery} FROM \`song\` WHERE \`songNo\` = ?`, [songNo]);
                result.forEach(parseSongDataFromDB);
                return result[0] ?? null;
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
        getSongsColumnsBySongNo: defineDBHandler<[string[], (keyof SongData | "order")[]], Partial<SongData>[]>((songNo, columns) => {
            return async (run) => {
                if (songNo.length === 0) {
                    return [];
                }

                const columnsQuery = columns.map((e) => escapeId(e)).join(', ');
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
                const query = `%${option.query.split(' ').map(Util.sqlEscapeString).map(e => e.replaceAll('%', '\\%').replaceAll('_', '\\_')).join('%')}%`
                sqlWhereQuery += `AND (${[...titleColumns, ...aliasColumns].map((column) => `\`${column}\` LIKE ${escape(query)}`).join(' OR ')})`;
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
        searchColumns: defineDBHandler<[page: number | null, columns: (keyof SongData | "order")[], option?: SongSearchOption], { songs: Partial<(SongData & { order: number })>[], count: number }>((page, columns, option) => {
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
                const query = `%${option.query.split(' ').map(Util.sqlEscapeString).map(e => e.replaceAll('%', '\\%').replaceAll('_', '\\_')).join('%')}%`
                sqlWhereQuery += `AND (${[...titleColumns, ...aliasColumns].map((column) => `\`${column}\` LIKE ${escape(query)}`).join(' OR ')})`;
            }

            const columnsQuery = columns.map((e) => escapeId(e)).join(', ')

            return async (run) => {
                const songs = (page === null || page < 1) ? await run(`SELECT ${columnsQuery} FROM \`song\` ${sqlWhereQuery} ORDER BY \`addedDate\` DESC`) : await run(`SELECT ${columnsQuery} FROM \`song\` ${sqlWhereQuery} ORDER BY \`addedDate\` DESC LIMIT ${(page - 1) * 30}, 30`);
                songs.forEach(parseSongDataFromDB);
                const count = Object.values((await run(`SELECT COUNT(\`order\`) FROM \`song\` ${sqlWhereQuery}`))[0])?.[0] as number ?? 0
                return {
                    songs,
                    count
                }
            };
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
         * Adds or updates a song.
         */
        uploadSong: defineDBHandler<[string, SongData], void>((songNo, songData) => {
            return async (run) => {
                const song = await DBController.getSongBySongNo.getCallback(songNo)(run);
                const setObject = {
                    songNo: (songData.songNo),
                    title: (songData.title),
                    titleKo: (songData.titleKo),
                    aliasKo: (songData.aliasKo),
                    titleEn: (songData.titleEn),
                    aliasEn: (songData.aliasEn),
                    titleZhCN: songData.titleZhCN,
                    romaji: (songData.romaji),
                    bpm: (JSON.stringify(songData.bpm)),
                    bpmShiver: (songData.bpmShiver),
                    version: (JSON.stringify(songData.version)),
                    isAsiaBanned: (songData.isAsiaBanned),
                    isKrBanned: (songData.isKrBanned),
                    genre: (JSON.stringify(songData.genre)),
                    artists: (JSON.stringify(songData.artists)),
                    addedDate: (songData.addedDate),
                    courses: (JSON.stringify(songData.courses)),
                    isDeleted: (songData.isDeleted),
                } as const;
                if (song === null) {
                    await Util.Server.queryBuilder
                        .insert('song')
                        .set(() => setObject)
                        .execute(run);
                }
                else {
                    await Util.Server.queryBuilder
                        .update('song', () => setObject)
                        .where(({ compare, column, value }) => [
                            compare(column('songNo'), '=', value(songNo))
                        ])
                        .execute(run);

                    // 곡에 연결된 문서의 `songNo` 수정
                    await Util.Server.queryBuilder
                        .update('docs', ({ value }) => ({
                            songNo: value(songData.songNo)
                        }))
                        .where(({ compare, column, value }) => [
                            compare(column('songNo'), '=', value(songNo))
                        ])
                        .execute(run);
                }

                await Util.Server.queryBuilder
                    .insert('song/log')
                    .set(({ value }) => ({
                        songNo: value(songData.songNo),
                        before: value(song ? JSON.stringify(song) : null),
                        after: value(JSON.stringify(songData)),
                        updatedTime: value(Date.now())
                    }))
                    .execute(run);
            }
        }),

        /**
         * 해당 songNo를 가진 곡이 존재하는지 여부 반환
         */
        songExistsBySongNo: defineDBHandler<[songNo: string]>((songNo) => {
            return async (run) => {
                const result = await run("SELECT COUNT(*) AS COUNT FROM `song` WHERE `songNo` = ?", [songNo]);
                if (result[0].COUNT === 0) {
                    return false;
                }
                return true;
            }
        })
    }

    export const reqDBController = {
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
                const song = await DBController.getSongBySongNo.getCallback(request.songNo)(run);

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
                const songRequest = await reqDBController.getRequestByOrder.getCallback(order)(run)
                if (!songRequest) return;
                const { data } = songRequest;
                await DBController.uploadSong.getCallback(songRequest.songNo, editedData ?? data)(run);
                await run("UPDATE `song/request` SET `status` = 'approved' WHERE `order` = ?", [order])
            }
        }),

        /** 
         * Disapprove a song request
        */
        disapprove: defineDBHandler<[number | number[]], void>((order) => {
            return async (run) => {
                if (Array.isArray(order)) {
                    await run(`UPDATE \`song/request\` SET \`status\` = 'disapproved' WHERE \`order\` IN (${order.map((e) => escape(e)).join(', ')})`)
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
    /**
    * Parse songData fetched from the database to match the SongData type
    */
    export function parseSongDataFromDB(songDataFromDB: any) {
        songDataFromDB.courses &&= JSON.parse(songDataFromDB.courses)
        songDataFromDB.courses && (songDataFromDB.courses.ura ??= null)
        songDataFromDB.bpm &&= JSON.parse(songDataFromDB.bpm)
        songDataFromDB.version &&= JSON.parse(songDataFromDB.version)
        songDataFromDB.genre &&= JSON.parse(songDataFromDB.genre)
        songDataFromDB.artists &&= JSON.parse(songDataFromDB.artists)
    }
}

type T = typeof SongServer;
export type { T as SongServer };
Song.Server = SongServer;

export { Song }