import { fetchMeasures, getRating } from "@taiko-wiki/taiko-rating";
import { escapeId } from 'mysql2';
import type { UserClearData, UserData, UserDonderData, UserScoreData } from "./types";
import { defineDBHandler } from "@yowza/db-handler";
import type { Badge, CardData, Clear, ClearData, Crown, Difficulty } from "node-hiroba/types";
import { randomUUID } from 'node:crypto';
import groupBy from "object.groupby";
import { getSongRating } from "@taiko-wiki/taiko-rating";
import type { Measure } from "@taiko-wiki/taiko-rating/types";

export const userDBController = {
    /**
     * Create user data.
     */
    createData: defineDBHandler<[string, string, object], UserData>((provider, providerId, providerUserData) => {
        return async (run) => {
            const UUID = randomUUID();
            const userData: Partial<UserData> = {
                provider,
                providerId,
                nickname: UUID,
                UUID,
                registerTime: Date.now(),
                grade: 2,
                providerUserData: JSON.stringify(providerUserData)
            }

            const r = await run(`INSERT INTO \`user/data\` (\`provider\`, \`providerId\`, \`nickname\`, \`UUID\`, \`registerTime\`, \`grade\`, \`providerUserData\`) VALUES (?, ?, ?, ?, ?, ?, ?)`, [userData.provider, userData.providerId, userData.nickname, userData.UUID, userData.registerTime, userData.grade, userData.providerUserData]);

            return (await run(`SELECT * FROM \`user/data\` WHERE \`order\` = ?`, [r.insertId]) as UserData[])[0]
        }
    }),

    /**
     * Retrieve user data by provider.
     */
    getDataByProvider: defineDBHandler<[string, string], UserData | null>((provider, providerId) => {
        return async (run) => {
            const result = await run(`SELECT * FROM \`user/data\` WHERE \`provider\` = ? AND \`providerId\` = ?`, [provider, providerId]);

            if (result.length !== 0) {
                const userData = result[0];
                if (userData.providerUserData) {
                    userData.providerUserData = JSON.parse(userData.providerUserData);
                }
                return userData;
            }// 유저 존재

            return null;
        }
    }),

    /**
     * Retrieve user data by specific UUID.
     */
    getData: defineDBHandler<[string], UserData | null>((UUID) => {
        return async (run) => {
            const result = await run(`SELECT * FROM \`user/data\` WHERE \`UUID\` = ?`, [UUID]);

            if (result.length !== 0) {
                const userData = result[0];
                if (userData.providerUserData) {
                    userData.providerUserData = JSON.parse(userData.providerUserData);
                }
                return userData;
            }// 유저 존재

            return null;
        }
    }),

    /**
     * Retrieve the nickname of a specific UUID.
     */
    getNickname: defineDBHandler<[string], string | null>((UUID) => {
        return async (run) => {
            return (await run("SELECT `nickname` FROM `user/data` WHERE `UUID` = ?", [UUID]))[0]?.nickname ?? null
        }
    }),

    /**
     * Change the nickname of a specific UUID.
     */
    changeNickname: defineDBHandler<[string, string], void>((UUID, newNickname) => {
        if (!/^([a-zA-Z가-힣0-9\-]*)$/.test(newNickname)) throw new Error('New nickname is not in the correct format');
        return async (run) => {
            if ((await run(`SELECT \`order\` FROM \`user/data\` WHERE \`nickname\` = ?`, [newNickname])).length !== 0) throw new Error('Duplicated Nickname');
            return await run(`UPDATE \`user/data\` SET \`nickname\` = ? WHERE \`UUID\` = ?`, [newNickname, UUID])
        }
    }),

    /**
     * Delete a user by specific UUID.
     */
    deleteUser: defineDBHandler<[string], void>((UUID) => {
        return async (run) => {
            const data = await userDBController.getData.getCallback(UUID)(run);

            if (!data) {
                return;
            }

            await run(`DELETE FROM \`user/data\` WHERE \`UUID\` = ?;`, [UUID]);
            await run("DELETE FROM `user/gamecenter_favorites` WHERE `UUID` = ?", [UUID]);
            await run("DELETE FROM `user/donder_data` WHERE `UUID` = ?", [UUID]);
        }
    }),

    /**
     * Retrieve all user data.
     */
    getAll: defineDBHandler<[], (UserData & { order: number })[]>(() => {
        return async (run) => {
            return await run("SELECT * FROM `user/data`");
        }
    }),

    /**
     * Retrieve user data with grade below a specific level.
     */
    getAllUnderGrade: defineDBHandler<[number], (UserData & { order: number })[]>((grade) => {
        return async (run) => {
            return await run("SELECT * FROM `user/data` WHERE `grade` < ?", [grade]);
        }
    }),

    /**
     * Set the grade for a specific UUID user.
     */
    setGrade: defineDBHandler<[string, number], void>((UUID, grade) => {
        return async (run) => {
            await run("UPDATE `user/data` SET `grade` = ? WHERE `UUID` = ?", [grade, UUID]);
        }
    }),

    /**
     * Set the language for a specific UUID user.
     */
    setLang: defineDBHandler<[string, string], void>((UUID, lang) => {
        return async (run) => {
            await run("UPDATE `user/data` SET `lang` = ? WHERE `UUID` = ?", [lang, UUID]);
        }
    }),

    /**
     * Retrieve the language of a specific UUID user.
     */
    getLang: defineDBHandler<[string], string | null>((UUID) => {
        return async (run) => {
            const result = await run("SELECT `lang` FROM `user/data` WHERE `UUID` = ?", [UUID]);

            if (result.length === 0) {
                return null;
            }

            return Object.values(result[0])[0] as string;
        }
    }),
    /**
     * Set Whether Rating Profile Disclose or not.
     */
    setShowRating: defineDBHandler<[string, Partial<Record<'nickname' | 'taikoNumber' | 'songs', boolean>>], void>((UUID, options) => {
        return async (run) => {
            const setQuery: string[] = [];
            if (options.nickname === true) {
                setQuery.push('showRatingNickname = 1');
            }
            else if (options.nickname === false) {
                setQuery.push('showRatingNickname = 0');
            }
            if (options.taikoNumber === true) {
                setQuery.push('showRatingTaikoNo = 1');
            }
            else if (options.taikoNumber === false) {
                setQuery.push('showRatingTaikoNo = 0');
            }
            if (options.songs === true) {
                setQuery.push('showRatingSongs = 1');
            }
            else if (options.songs === false) {
                setQuery.push('showRatingSongs = 0');
            }

            if (setQuery.length !== 0) {
                await run("UPDATE `user/data` SET " + setQuery.join(',') + " WHERE `UUID` = ?", [UUID]);
            }
        }
    })
}

// 동더 데이터 DB
export const userDonderDBController = {
    /**
     * update donder data
     */
    updateData: defineDBHandler<[string, { donderData: CardData; clearData: UserClearData; scoreData?: UserScoreData }]>((UUID, data) => {
        return async (run) => {
            const countResult = await run("SELECT COUNT(*) FROM `user/donder_data` WHERE `UUID` = ?", [UUID]);
            const count = Object.values(countResult[0])[0];

            if (count === 0) { //처음 추가한 경우
                if ("scoreData" in data) {
                    const measures = await fetchMeasures();
                    const currentRating = getRating(data.scoreData as UserScoreData, measures);
                    await run(
                        "INSERT INTO `user/donder_data` (`UUID`, `donder`, `clearData`, `scoreData`, `currentRating`, `currentExp`, `ratingData`) VALUES (?, ?, ?, ?, ?, ?, ?)",
                        [UUID, JSON.stringify(data.donderData), JSON.stringify(data.clearData), JSON.stringify(data.scoreData), currentRating.rating, currentRating.exp, JSON.stringify(currentRating.songRatingDatas)]
                    );
                }
                else {
                    await run("INSERT INTO `user/donder_data` (`UUID`, `donder`, `clearData`) VALUES (?, ?, ?)", [UUID, JSON.stringify(data.donderData), JSON.stringify(data.clearData)]);
                }
            }
            else { //업데이트 한 경우
                if ("scoreData" in data) {
                    const formerData = await userDonderDBController.getDataColumns(UUID, ['clearData', 'scoreData', 'currentRating', 'currentExp']) as Pick<UserDonderData, 'clearData' | 'scoreData' | 'currentExp' | 'currentRating'>;
                    const mergedClearData = mergeClearData(formerData?.clearData, data.clearData);

                    const measures = await fetchMeasures();
                    const mergedScoreData = mergeScoreData(formerData.scoreData as UserScoreData, data.scoreData as UserScoreData, measures);
                    const currentRating = getRating(mergedScoreData as UserScoreData, measures);

                    if (formerData === null) {
                        await run(
                            "UPDATE `user/donder_data` SET `donder` = ?, `clearData` = ?, `scoreData` = ?, `currentRating` = ?, `currentExp` = ?, `ratingData` = ?, `lastUpdate` = CURRENT_TIMESTAMP(), `lastRatingCalculate` = CURRENT_TIMESTAMP() WHERE `UUID` = ?",
                            [JSON.stringify(data.donderData), JSON.stringify(mergedClearData), JSON.stringify(mergedScoreData), currentRating.rating, currentRating.exp, JSON.stringify(currentRating.songRatingDatas), UUID]
                        );
                    }
                    else {
                        await run(
                            "UPDATE `user/donder_data` SET `donder` = ?, `clearData` = ?, `scoreData` = ?, `currentRating` = ?, `currentExp` = ?, `ratingHistory` = JSON_ARRAY_APPEND(`ratingHistory`, '$', ?), `expHistory` = JSON_ARRAY_APPEND(`expHistory`, '$', ?), `ratingData` = ?, `lastUpdate` = CURRENT_TIMESTAMP(), `lastRatingCalculate` = CURRENT_TIMESTAMP() WHERE `UUID` = ?",
                            [JSON.stringify(data.donderData), JSON.stringify(mergedClearData), JSON.stringify(mergedScoreData), currentRating.rating, currentRating.exp, formerData.currentRating, formerData.currentExp, JSON.stringify(currentRating.songRatingDatas), UUID]
                        );
                    }
                }
                else {
                    const formerData = await userDonderDBController.getDataColumns(UUID, ['clearData']) as Pick<UserDonderData, 'clearData'>;
                    const mergedClearData = mergeClearData(formerData?.clearData, data.clearData);

                    await run("UPDATE `user/donder_data` SET `donder` = ?, `clearData` = ? WHERE `UUID` = ?", [JSON.stringify(data.donderData), JSON.stringify(mergedClearData), UUID]);
                }
            }
        }
    }),

    /**
     * get donder data
     */
    getData: defineDBHandler<[UUID: string], UserDonderData | null>((UUID) => {
        return async (run) => {
            const result = await run("SELECT * FROM `user/donder_data` WHERE `UUID` = ?", [UUID]);

            if (result.length === 0) {
                return null;
            }

            result.forEach(parseDonderData);
            const data = result[0];

            return data as UserDonderData;
        }
    }),

    /**
     * get donder data columns
     */
    getDataColumns: defineDBHandler<[string, (keyof UserDonderData)[]], Partial<UserDonderData> | null>((UUID, columns) => {
        const columnsQuery = columns.map(e => escapeId(e)).join(', ');
        return async (run) => {
            const result = await run(`SELECT ${columnsQuery} FROM \`user/donder_data\` WHERE \`UUID\` = ?`, [UUID]);

            if (result.length === 0) {
                return null;
            }

            result.forEach(parseDonderData);
            const data = result[0];

            return data as Partial<UserDonderData>;
        }
    }),

    /**
     * get clear data
     */
    getClearData: defineDBHandler<[string], ClearData[]>((UUID) => {
        return async (run) => {
            const result = await run("SELECT `clearData` FROM `user/donder_data` WHERE `UUID` = ?", [UUID]);

            if (result.length === 0) {
                return null;
            }

            return JSON.parse(result[0].clearData)
        }
    }),

    /**
     * update current rating
     */
    updateCurrentRating: defineDBHandler<[UUID: string, cuurentRating: number, currentExp: number, ratingData: UserDonderData['ratingData']], void>((UUID, currentRating, currentExp, ratingData) => {
        return async (run) => {
            await run("UPDATE `user/donder_data` SET `currentRating` = ?, `currentExp` = ?, `ratingData` = ?, `lastRatingCalculate` = CURRENT_TIMESTAMP() WHERE `UUID` = ?", [currentRating, currentExp, JSON.stringify(ratingData), UUID])
        }
    }),
    /**
     * get rank by rating
     */
    getRankByRating: defineDBHandler<[string], { count: number, ranking: number }>((UUID) => {
        return async (run) => {
            const count: number = Object.values((await run("SELECT COUNT(*) FROM `user/donder_data` WHERE `currentRating` IS NOT NULL"))[0])[0] as number;
            const ranking: number = (Object.values((await run("SELECT COUNT(*) FROM `user/donder_data` WHERE (`currentRating` > (SELECT `currentRating` FROM `user/donder_data` WHERE `UUID` = ?)) AND (`currentRating` IS NOT NULL)", [UUID]))[0])[0] as number) + 1;

            return {
                count,
                ranking
            }
        }
    }),
    /**
     * get rankings by page
     */
    getRanking: defineDBHandler<[number], any>((page) => {
        return async (run) => {
            const limitQuery = `LIMIT ${(page - 1) * 50}, 50`;
            const result = await run("SELECT `user/donder_data`.`UUID`, `user/donder_data`.`currentRating`, `user/donder_data`.`donder`, `user/data`.`showRatingNickname` , `user/data`.`showRatingTaikoNo` FROM `user/donder_data` LEFT OUTER JOIN `user/data` ON `user/donder_data`.`UUID` = `user/data`.`UUID` WHERE `user/donder_data`.`currentRating` IS NOT NULL ORDER BY `currentRating` DESC " + limitQuery);
            result.forEach(parseDonderData);
            return result;
        }
    }) as (page: number) => Promise<(Pick<UserDonderData, 'UUID' | 'currentRating' | 'donder'> & Pick<UserData, 'UUID' | 'showRatingNickname' | 'showRatingTaikoNo'> & { currentRating: number; })[]>,
    /**
     * count donder data
     */
    count: defineDBHandler<[], number>(() => {
        return async (run) => {
            const count: number = Object.values((await run("SELECT COUNT(*) FROM `user/donder_data` WHERE `currentRating` IS NOT NULL"))[0])[0] as number;

            return count;
        }
    }) as () => Promise<number>,
    /**
     * get user rating
     */
    getUserRating: defineDBHandler<[UUID: string], (UserDonderData & Pick<UserData, 'UUID' | 'showRatingNickname' | 'showRatingTaikoNo' | 'showRatingSongs'>) | null>((UUID) => {
        return async (run) => {
            const result = await run("SELECT `user/donder_data`.*, `user/data`.`showRatingNickname`, `user/data`.`showRatingTaikoNo`, `user/data`.`showRatingSongs` from `user/donder_data` LEFT OUTER JOIN `user/data` ON `user/donder_data`.`UUID` = `user/data`.`UUID` WHERE `user/donder_data`.`UUID` = ?", [UUID]);

            if (result.length === 0) {
                return null;
            }

            result.forEach(parseDonderData);
            return result[0];
        }
    })
}

// db 동더 데이터 파싱
function parseDonderData(data: any) {
    data.donder &&= JSON.parse(data.donder);
    data.clearData &&= JSON.parse(data.clearData);
    data.scoreData &&= data.scoreData === null ? null : JSON.parse(data.scoreData);
    data.ratingHistory &&= JSON.parse(data.ratingHistory);
    data.expHistory &&= JSON.parse(data.expHistory);
    data.ratingData &&= JSON.parse(data.ratingData);
}

// 스코어데이터 병합
function mergeScoreData(oldData: UserScoreData | undefined, newData: UserScoreData, measures: Measure[]): UserScoreData {
    if (!oldData) return structuredClone(newData);
    const data = structuredClone(oldData);
    measures.forEach(measure => {
        const oldScoreData = oldData[measure.songno]?.difficulty?.[measure.diff];
        const newScoreData = newData[measure.songno]?.difficulty?.[measure.diff];

        if (!oldScoreData) {
            if (newScoreData) {
                if (!data[measure.songno]) {
                    data[measure.songno] = newData[measure.songno]
                }
                else {
                    data[measure.songno].difficulty[measure.diff] = newData[measure.songno].difficulty[measure.diff];
                }
                return;
            }
            else {
                return;
            }
        }
        if (!newScoreData) {
            return;
        }

        const oldSongRating = getSongRating(oldScoreData, measure.notes, measure.measureValue);
        const newSongRating = getSongRating(newScoreData, measure.notes, measure.measureValue);

        if (oldSongRating.value < newSongRating.value) {
            data[measure.songno].difficulty[measure.diff] = newData[measure.songno].difficulty[measure.diff];
        }
    });

    return data;
}

function mergeClearData(oldData: ClearData[] | undefined, newData: ClearData[]) {
    if (!oldData) return structuredClone(newData);

    const data = structuredClone(oldData);
    const crowns: Crown[] = [null, 'played', 'silver', 'gold', 'donderfull'];
    const badges: Badge[] = [null, 'white', 'bronze', 'silver', 'gold', 'pink', 'purple', 'rainbow'];
    newData.forEach(clearData => {
        const oldClearData = data.find((e) => e.songNo === clearData.songNo);
        if (!oldClearData) {
            data.push(clearData);
            return;
        }

        Object.keys(clearData.difficulty).forEach((value) => {
            const diff = value as Difficulty;
            const oldDiffData = oldClearData.difficulty[diff];
            if (!oldDiffData) {
                oldClearData.difficulty[diff] = clearData.difficulty[diff];
                return;
            }

            const oldCrownNum = crowns.indexOf(oldDiffData.crown);
            const newCrownNum = crowns.indexOf((clearData.difficulty[diff] as Clear).crown);
            if (newCrownNum > oldCrownNum) {
                oldDiffData.crown = crowns[newCrownNum];
            }

            const oldBadgeNum = badges.indexOf(oldDiffData.badge);
            const newBadgeNum = badges.indexOf((clearData.difficulty[diff] as Clear).badge);
            if (newBadgeNum > oldBadgeNum) {
                oldDiffData.badge = badges[newBadgeNum];
            }
        })
    })

    return data;
}