import { fetchMeasures, getRating } from "@taiko-wiki/taiko-rating";
import { escapeId } from 'mysql2';
import { defineDBHandler } from "@yowza/db-handler";
import type { Badge, CardData, Clear, Crown, Difficulty } from "node-hiroba/types";
import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { getSongRating } from "@taiko-wiki/taiko-rating";
import type { Measure } from "@taiko-wiki/taiko-rating/types";
import { User } from ".";
import { Util } from "../util/util.server";
import type { RequestEvent } from "@sveltejs/kit";
import type { InferDBSchema } from "@yowza/db-handler/types";

const { queryBuilder } = Util.Server;

namespace UserServer {
    export const DBController = {
        /**
         * Create user data.
         */
        createData: defineDBHandler<[string, string, object], User.Data>((provider, providerId, providerUserData) => {
            return async (run) => {
                const UUID = randomUUID();
                const userData = {
                    provider,
                    providerId,
                    nickname: UUID,
                    UUID,
                    registerTime: Date.now(),
                    grade: 2,
                    providerUserData: JSON.stringify(providerUserData)
                } satisfies Partial<User.Data>;

                const result = await queryBuilder
                    .insert('user/data')
                    .set(() => (userData))
                    .execute(run);

                return await queryBuilder
                    .select('user/data', '*')
                    .where(({ compare, column, value }) => [compare(column('order'), '=', value(result.insertId))])
                    .execute(run)
                    .then((rows) => rows[0] as User.Data);
            }
        }),

        /**
         * Retrieve user data by provider.
         */
        getDataByProvider: defineDBHandler<[string, string], User.Data | null>((provider, providerId) => {
            return async (run) => {
                const rows = await queryBuilder
                    .select('user/data', '*')
                    .where(({ compare, column, value }) => [
                        compare(column('provider'), '=', value(provider)),
                        compare(column('providerId'), '=', value(providerId))
                    ])
                    .execute(run);

                if (rows.length !== 0) {
                    // 유저 존재
                    return parseUserData(rows[0]);
                }

                return null;
            }
        }),

        /**
         * Retrieve user data by specific UUID.
         */
        getData: defineDBHandler<[string], User.Data | null>((UUID) => {
            return async (run) => {
                const rows = await queryBuilder
                    .select('user/data', '*')
                    .where(({ compare, column, value }) => [compare(column('UUID'), '=', value(UUID))])
                    .limit(1)
                    .execute(run);

                if (rows.length !== 0) {// 유저 존재
                    return parseUserData(rows[0]);
                }

                return null;
            }
        }),

        /**
         * Retrieve the nickname of a specific UUID.
         */
        getNickname: defineDBHandler<[string], string | null>((UUID) => {
            return async (run) => {
                return await queryBuilder
                    .select('user/data', () => ({
                        nickname: 'nickname'
                    }))
                    .where(({ compare, column, value }) => [compare(column('UUID'), '=', value(UUID))])
                    .execute(run)
                    .then((rows) => rows[0]?.nickname ?? null);
            }
        }),

        /**
         * Change the nickname of a specific UUID.
         */
        changeNickname: defineDBHandler<[string, string], void>((UUID, newNickname) => {
            if (!/^([a-zA-Z가-힣0-9\-]*)$/.test(newNickname)) throw new Error('New nickname is not in the correct format');
            return async (run) => {
                const duplicated = await queryBuilder
                    .select('user/data', ({ count }) => ({ count: count() }))
                    .where(({ compare, column, value }) => [compare(column('nickname'), '=', value(newNickname))])
                    .execute(run)
                    .then((rows) => rows[0].count > 0);
                if (duplicated) throw new Error('Duplicated Nickname');
                await queryBuilder
                    .update('user/data', ({ value }) => ({
                        nickname: value(newNickname)
                    }))
                    .where(({ compare, column, value }) => [compare(column('UUID'), '=', value(UUID))])
                    .execute(run);
                return;
            }
        }),

        /**
         * Delete a user by specific UUID.
         */
        deleteUser: defineDBHandler<[UUID: string], void>((UUID) => {
            return async (run) => {
                const data = await DBController.getData.getCallback(UUID)(run);

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
        getAll: defineDBHandler<[], (User.Data & { order: number })[]>(() => {
            return async (run) => {
                return await run("SELECT * FROM `user/data`");
            }
        }),

        /**
         * Retrieve user data with grade below a specific level.
         */
        getAllUnderGrade: defineDBHandler<[number], (User.Data & { order: number })[]>((grade) => {
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
                const set: Partial<Record<'showRatingNickname' | 'showRatingTaikoNo' | 'showRatingSongs', 1 | 0>> = {}
                if (options.nickname) {
                    set.showRatingNickname = 1;
                }
                else if (options.nickname === false) {
                    set.showRatingNickname = 0;
                }
                if (options.taikoNumber) {
                    set.showRatingTaikoNo = 1;
                }
                else if (options.taikoNumber === false) {
                    set.showRatingTaikoNo = 0;
                }
                if (options.songs) {
                    set.showRatingSongs = 1;
                }
                else if (options.songs === false) {
                    set.showRatingSongs = 0;
                }


                if (Object.keys(set).length > 0) {
                    await queryBuilder
                        .update('user/data', () => set)
                        .where(({ compare, column, value }) => [compare(column('UUID'), '=', value(UUID))])
                        .execute(run)
                }
            }
        }),
        /**
         * 인증 정보가 밴되었는지 확인
         */
        checkAuthBanned: defineDBHandler<[provider: string, providerId: string], boolean>((provider, providerId) => {
            return async (run) => {
                const rows = await run("SELECT COUNT(*) as `count` FROM `ban/auth` WHERE `provider` = ? AND `providerId` = ?", [provider, providerId]);

                return rows[0].count > 0;
            }
        }),
        /**
         * 인증 정보를 밴
         */
        banAuth: defineDBHandler<[provider: string, providerId: string], void>((provider, providerId) => {
            return async (run) => {
                await queryBuilder.insert('ban/auth').set(() => ({ provider, providerId })).execute(run)
            }
        }),
        doesUUIDExists: defineDBHandler<[UUID: string], boolean>((UUID) => {
            return async (run) => {
                const result = await run("SELECT COUNT(*) AS `count` FROM `user/data` WHERE `UUID` = ?", [UUID]);
                if (result?.[0]?.count) return true;
                return false;
            }
        })
    }

    // 동더 데이터 DB
    export const donderDBController = {
        /**
         * update donder data
         */
        updateData: defineDBHandler<[string, { donderData: CardData; clearData: User.ClearData; scoreData?: User.ScoreData }]>((UUID, data) => {
            return async (run) => {
                const countResult = await run("SELECT COUNT(*) FROM `user/donder_data` WHERE `UUID` = ?", [UUID]);
                const count = Object.values(countResult[0])[0];

                // 카드 데이터 북 번호 자릿수 맞추기
                data.donderData.taikoNumber = `${data.donderData.taikoNumber}`;
                while (true) {
                    if (data.donderData.taikoNumber.length >= 12) break;
                    data.donderData.taikoNumber = `0${data.donderData.taikoNumber}`;
                }

                if (count === 0) { //처음 추가한 경우
                    if ("scoreData" in data) {
                        const measures = await fetchMeasures();
                        const currentRating = getRating(data.scoreData as User.ScoreData, measures);
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
                        const formerData = await donderDBController.getDataColumns(UUID, ['clearData', 'scoreData', 'currentRating', 'currentExp']) as Pick<User.DonderData, 'clearData' | 'scoreData' | 'currentExp' | 'currentRating'>;
                        const mergedClearData = mergeClearData(formerData?.clearData, data.clearData);

                        const measures = await fetchMeasures();
                        const mergedScoreData = mergeScoreData(formerData.scoreData as User.ScoreData, data.scoreData as User.ScoreData, measures);
                        const currentRating = getRating(mergedScoreData as User.ScoreData, measures);

                        if (formerData === null) {
                            await run(
                                "UPDATE `user/donder_data` SET `donder` = ?, `clearData` = ?, `scoreData` = ?, `currentRating` = ?, `currentExp` = ?, `ratingData` = ?, `lastUpdate` = CURRENT_TIMESTAMP(), `lastRatingCalculate` = CURRENT_TIMESTAMP() WHERE `UUID` = ?",
                                [JSON.stringify(data.donderData), JSON.stringify(mergedClearData), JSON.stringify(mergedScoreData), currentRating.rating, currentRating.exp, JSON.stringify(currentRating.songRatingDatas), UUID]
                            );
                        }
                        else {
                            await queryBuilder
                                .update('user/donder_data', ({ raw }) => ({
                                    donder: JSON.stringify(data.donderData),
                                    clearData: JSON.stringify(mergedClearData),
                                    scoreData: JSON.stringify(mergedScoreData),
                                    currentRating: currentRating.rating,
                                    currentExp: currentRating.exp,
                                    ratingHistory: raw(`JSON_ARRAY_APPEND(\`ratingHistory\`, '$', JSON_ARRAY(${Date.now()}, ${currentRating.rating}))`),
                                    expHistory: raw(`JSON_ARRAY_APPEND(\`expHistory\`, '$', JSON_ARRAY(${Date.now()}, ${currentRating.exp}))`),
                                    ratingData: JSON.stringify(currentRating.songRatingDatas),
                                    lastUpdate: raw(`CURRENT_TIMESTAMP()`),
                                    lastRatingCalculate: raw(`CURRENT_TIMESTAMP()`)
                                }))
                                .where(({ compare, column, value }) => [compare(column('UUID'), '=', value(UUID))])
                                .execute(run);
                        }
                    }
                    else {
                        const formerData = await donderDBController.getDataColumns(UUID, ['clearData']) as Pick<User.DonderData, 'clearData'>;
                        const mergedClearData = mergeClearData(formerData?.clearData, data.clearData);

                        await run("UPDATE `user/donder_data` SET `donder` = ?, `clearData` = ? WHERE `UUID` = ?", [JSON.stringify(data.donderData), JSON.stringify(mergedClearData), UUID]);
                    }
                }
            }
        }),

        /**
         * get donder data
         */
        getData: defineDBHandler<[UUID: string], User.DonderData | null>((UUID) => {
            return async (run) => {
                const result = await run("SELECT * FROM `user/donder_data` WHERE `UUID` = ?", [UUID]);

                if (result.length === 0) {
                    return null;
                }

                result.forEach(parseDonderData);
                const data = result[0];

                return data as User.DonderData;
            }
        }),

        /**
         * get donder data columns
         */
        getDataColumns: defineDBHandler<[string, (keyof User.DonderData)[]], Partial<User.DonderData> | null>((UUID, columns) => {
            const columnsQuery = columns.map(e => escapeId(e)).join(', ');
            return async (run) => {
                const result = await run(`SELECT ${columnsQuery} FROM \`user/donder_data\` WHERE \`UUID\` = ?`, [UUID]);

                if (result.length === 0) {
                    return null;
                }

                result.forEach(parseDonderData);
                const data = result[0];

                return data as Partial<User.DonderData>;
            }
        }),

        /**
         * get clear data
         */
        getClearData: defineDBHandler<[string], User.ClearData>((UUID) => {
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
        updateCurrentRating: defineDBHandler<[UUID: string, cuurentRating: number, currentExp: number, ratingData: User.DonderData['ratingData']], void>((UUID, currentRating, currentExp, ratingData) => {
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
        getRanking: defineDBHandler<[number], (Pick<User.DonderData, 'UUID' | 'currentRating' | 'donder'> & Pick<User.Data, 'UUID' | 'showRatingNickname' | 'showRatingTaikoNo'> & { currentRating: number; })[]>((page) => {
            return async (run) => {
                const limitQuery = `LIMIT ${(page - 1) * 50}, 50`;
                const result = await run("SELECT `user/donder_data`.`UUID`, `user/donder_data`.`currentRating`, `user/donder_data`.`donder`, `user/data`.`showRatingNickname` , `user/data`.`showRatingTaikoNo` FROM `user/donder_data` LEFT OUTER JOIN `user/data` ON `user/donder_data`.`UUID` = `user/data`.`UUID` WHERE `user/donder_data`.`currentRating` IS NOT NULL ORDER BY `currentRating` DESC " + limitQuery);
                result.forEach(parseDonderData);
                return result;
            }
        }),
        /**
         * count donder data
         */
        count: defineDBHandler<[], number>(() => {
            return async (run) => {
                const count: number = Object.values((await run("SELECT COUNT(*) FROM `user/donder_data` WHERE `currentRating` IS NOT NULL"))[0])[0] as number;

                return count;
            }
        }),
        /**
         * get user rating
         */
        getUserRating: defineDBHandler<[UUID: string], (User.DonderData & Pick<User.Data, 'UUID' | 'showRatingNickname' | 'showRatingTaikoNo' | 'showRatingSongs'>) | null>((UUID) => {
            return async (run) => {
                const result = await run("SELECT `user/donder_data`.*, `user/data`.`showRatingNickname`, `user/data`.`showRatingTaikoNo`, `user/data`.`showRatingSongs` from `user/donder_data` LEFT OUTER JOIN `user/data` ON `user/donder_data`.`UUID` = `user/data`.`UUID` WHERE `user/donder_data`.`UUID` = ?", [UUID]);

                if (result.length === 0) {
                    return null;
                }

                result.forEach(parseDonderData);
                return result[0];
            }
        }),
        /**
         * 동더가 밴되었는지 확인
         */
        checkDonderBanned: defineDBHandler<[taikoNumber: string], boolean>((taikoNumber) => {
            return async (run) => {
                const rows = await run("SELECT COUNT(*) as `count` FROM `ban/donder` WHERE `taikoNumber` = ?", [taikoNumber]);

                return rows[0].count > 0;
            }
        })
    }

    export const apiKeyDBController = {
        generateKey: defineDBHandler<[UUID: string], string>((UUID) => {
            return async (run) => {
                await queryBuilder
                    .delete('user/api_key')
                    .where(({ compare, column, value }) => [compare(column('UUID'), '=', value(UUID))])
                    .execute(run);

                const key = Util.pipe(randomBytes(32).toString('hex'), [
                    (key: string) => {
                        const hash = createHash('sha512');
                        hash.update(key);
                        return hash.digest('hex');
                    }
                ])

                await queryBuilder
                    .insert('user/api_key')
                    .set(() => ({
                        UUID, key
                    }))
                    .execute(run);

                return key;
            }
        }),
        checkKey: defineDBHandler<[key: string], string | null>((key) => {
            const query = queryBuilder.select('user/api_key', '*')
                .where(({ column, value, compare }) => [compare(column('key'), '=', value(key))])
                .build();
            return async (run) => {
                const result = await run(query);
                if (result?.[0]?.UUID) {
                    return result[0].UUID;
                }
                return null;
            }
        })
    }

    export function logout(event: RequestEvent) {
        event.cookies.delete('auth-user', { path: '/' });
    }
}

export type { UserServer };
User.Server = UserServer;

// 유저 데이터 파싱
function parseUserData<const T extends Partial<InferDBSchema<typeof queryBuilder.dbSchema>['user/data']>>(data: T) {
    type Return = T extends Partial<InferDBSchema<typeof queryBuilder.dbSchema>['user/data']> ? Pick<User.Data, Extract<keyof T, keyof User.Data>> : never;

    const userData: Partial<User.Data> = {};
    for (const key in data) {
        if (key === "registerTimeStamp") continue;
        if (key === "providerUserData") {
            userData.providerUserData = JSON.parse(data[key] as string)
        }
        else {
            userData[key as keyof User.Data] = data[key] as any;
        }
    }

    return userData as Return;
}

// db 동더 데이터 파싱
function parseDonderData(data: any) {
    data.donder &&= JSON.parse(data.donder);
    data.clearData &&= JSON.parse(data.clearData);
    data.scoreData &&= data.scoreData === null ? null : JSON.parse(data.scoreData);
    data.ratingHistory &&= JSON.parse(data.ratingHistory).map(([time, rating]: [number, number]) => [new Date(time), rating]);
    data.expHistory &&= JSON.parse(data.expHistory).map(([time, rating]: [number, number]) => [new Date(time), rating]);
    data.ratingData &&= JSON.parse(data.ratingData);
}

// 스코어데이터 병합
function mergeScoreData(oldData: User.ScoreData | undefined, newData: User.ScoreData, measures: Measure[]): User.ScoreData {
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

        if (oldSongRating.value <= newSongRating.value) {
            data[measure.songno].difficulty[measure.diff] = newData[measure.songno].difficulty[measure.diff];
        }
    });

    return data;
}

function mergeClearData(oldData: User.ClearData | undefined, newData: User.ClearData) {
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