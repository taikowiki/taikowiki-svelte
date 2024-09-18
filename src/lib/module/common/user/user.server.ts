import { fetchMeasures, getRating } from "@taiko-wiki/taiko-rating";
import type { UserClearData, UserData, UserDonderData, UserScoreData } from "./types";
import { defineDBHandler } from "@yowza/db-handler";
import type { CardData, ClearData } from "node-hiroba/types";
import groupBy from "object.groupby";

export const userDBController = {
    /**
     * Create user data.
     */
    createData: defineDBHandler<[string, string, object], UserData>((provider, providerId, providerUserData) => {
        return async (run) => {
            const UUID = Object.values(groupBy(Array.from(((Date.now() * Math.random()).toString(32).replace('.', '') + (Date.now() * Math.random()).toString(32).replace('.', '')).slice(0, 16)), (_: any, i: any) => i % 4)).map(e => (e as string[]).join('')).join('-')

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
    })
}

export const userDonderDBController = {
    /**
     * update donder data
     */
    updateData: defineDBHandler<[string, { donderData: CardData; clearData: UserClearData; scoreData?: UserScoreData }]>((UUID, data) => {
        return async (run) => {
            const countResult = await run("SELECT COUNT(*) FROM `user/donder_data` WHERE `UUID` = ?", [UUID]);
            const count = Object.values(countResult[0])[0];

            if (count === 0) {
                if ("scoreData" in data) {
                    await run("INSERT INTO `user/donder_data` (`UUID`, `donder`, `clearData`, `scoreData`) VALUES (?, ?, ?, ?)", [UUID, JSON.stringify(data.donderData), JSON.stringify(data.clearData), JSON.stringify(data.scoreData)]);
                }
                else {
                    await run("INSERT INTO `user/donder_data` (`UUID`, `donder`, `clearData`) VALUES (?, ?, ?)", [UUID, JSON.stringify(data.donderData), JSON.stringify(data.clearData)]);
                }
            }
            else {
                if ("scoreData" in data) {
                    const formerScoreDataResult = await run("SELECT `scoreData` FROM `user/donder_data` WHERE `UUID` = ?", [UUID]);
                    const formerScoreData = JSON.parse(formerScoreDataResult[0].scoreData);
                    const measures = await fetchMeasures();
                    const currentRating = getRating(data.scoreData as UserScoreData, measures);
                    if (formerScoreData === null) {
                        await run("UPDATE `user/donder_data` SET `donder` = ?, `clearData` = ?, `scoreData` = ?, `currentRating` = ? ,`lastUpdate` = CURRENT_TIMESTAMP() WHERE `UUID` = ?", [JSON.stringify(data.donderData), JSON.stringify(data.clearData), JSON.stringify(data.scoreData), currentRating.rating, UUID]);
                    }
                    else {
                        const formerRating = getRating(formerScoreData, measures);
                        await run("UPDATE `user/donder_data` SET `donder` = ?, `clearData` = ?, `scoreData` = ?, `currentRating` = ?, `lastUpdate` = CURRENT_TIMESTAMP(), `ratingHistory` = JSON_ARRAY_APPEND(`ratingHistory`, '$', ?)  WHERE `UUID` = ?", [JSON.stringify(data.donderData), JSON.stringify(data.clearData), JSON.stringify(data.scoreData), currentRating.rating, formerRating.rating, UUID]);
                    }
                }
                else {
                    await run("UPDATE `user/donder_data` SET `donder` = ?, `clearData` = ?, `lastUpdate` = CURRENT_TIMESTAMP() WHERE `UUID` = ?", [JSON.stringify(data.donderData), JSON.stringify(data.clearData), UUID]);
                }
            }
        }
    }),

    /**
     * get donder data
     */
    getData: defineDBHandler<[string], UserDonderData | null>((UUID) => {
        return async (run) => {
            const result = await run("SELECT * FROM `user/donder_data` WHERE `UUID` = ?", [UUID]);

            if (result.length === 0) {
                return null;
            }

            const data = result[0];
            data.donder = JSON.parse(data.donder);
            data.clearData = JSON.parse(data.clearData);
            data.scoreData = data.scoreData === null ? null : JSON.parse(data.scoreData);
            data.ratingHistory = JSON.parse(data.ratingHistory);

            return data as UserDonderData;
        }
    }),

    /**
     * get clear data
     */
    getClearData: defineDBHandler<[string], ClearData[]>((UUID) => {
        return async (run) => {
            const result = await run("SELECT `clearData` FROM `user/donder_data` WHERE `UUID` = ?", [UUID]);

            if(result.length === 0){
                return null;
            }

            return JSON.parse(result[0].clearData)
        }
    }),

    /**
     * update current rating
     */
    updateCurrentRating: defineDBHandler<[string, number], void>((UUID, currentRating) => {
        return async(run) => {
            await run("UPDATE `user/donder_data` SET `currentRating` = ? WHERE `UUID` = ?", [currentRating, UUID])
        }
    }),

    /**
     * get rank by rating
     */
    getRankByRating: defineDBHandler<[string], {count: number, ranking: number}>((UUID) => {
        return async(run) => {
            const count: number = Object.values((await run("SELECT COUNT(*) FROM `user/donder_data` WHERE `currentRating` IS NOT NULL"))[0])[0] as number;
            const ranking: number = (Object.values((await run("SELECT COUNT(*) FROM `user/donder_data` WHERE (`currentRating` > (SELECT `currentRating` FROM `user/donder_data` WHERE `UUID` = ?)) AND (`currentRating` IS NOT NULL)", [UUID]))[0])[0] as number) + 1;

            return {
                count,
                ranking
            }
        }
    })
}