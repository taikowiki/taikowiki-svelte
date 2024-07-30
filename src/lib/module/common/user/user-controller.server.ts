import type { UserData } from "./types";
import { defineDBHandler } from "@yowza/db-handler";
//@ts-expect-error
import groupBy from "object.groupby";

export const userDBController = {
    /**
     * 유저 데이터를 생성합니다.
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
     * provider와 providerId를 통해 유저데이터를 가져옵니다.
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
     * 특정 UUID의 유저데이터를 가져옵니다.
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
     * 특정 UUID의 닉네임을 가져옵니다.
     */
    getNickname: defineDBHandler<[string], string | null>((UUID) => {
        return async (run) => {
            return (await run("SELECT `nickname` FROM `user/data` WHERE `UUID` = ?", [UUID]))[0]?.nickname ?? null
        }
    }),

    /**
     * 특정 UUID의 닉네임을 변경합니다.
     */
    changeNickname: defineDBHandler<[string, string], void>((UUID, newNickname) => {
        if (!/^([a-zA-Z가-힣0-9\-]*)$/.test(newNickname)) throw new Error('New nickname is not in the correct format');
        return async (run) => {
            if ((await run(`SELECT \`order\` FROM \`user/data\` WHERE \`nickname\` = ?`, [newNickname])).length !== 0) throw new Error('Duplicated Nickname');
            return await run(`UPDATE \`user/data\` SET \`nickname\` = ? WHERE \`UUID\` = ?`, [newNickname, UUID])
        }
    }),

    /**
     * 특정 UUID의 유저를 삭제합니다.
     */
    deleteUser: defineDBHandler<[string], void>((UUID) => {
        return async (run) => {
            const data = await userDBController.getData.getCallback(UUID)(run);

            if (!data) {
                return;
            }

            await run(`DELETE FROM \`user/data\` WHERE \`UUID\` = ?;`, [UUID]);
            await run("DELETE FROM `user/gamecenter_favorites` WHERE `UUID` = ?", [UUID]);
        }
    }),

    /**
     * 모든 유저 데이터를 가져옵니다.
     */
    getAll: defineDBHandler<[], (UserData & { order: number })[]>(() => {
        return async (run) => {
            return await run("SELECT * FROM `user/data");
        }
    }),
    /**
     * 특정 등급 미만의 유저 데이터를 가져옵니다.
     */
    getAllUnderGrade: defineDBHandler<[number], (UserData & { order: number })[]>((grade) => {
        return async (run) => {
            return await run("SELECT * FROM `user/data` WHERE `grade` < ?", [grade]);
        }
    }),

    /**
     * 특정 UUID의 등급을 설정합니다.
     */
    setGrade: defineDBHandler<[string, number], void>((UUID, grade) => {
        return async (run) => {
            await run("UPDATE `user/data` SET `grade` = ? WHERE `UUID` = ?", [grade, UUID]);
        }
    }),

    /**
     * 특정 UUID의 언어를 설정합니다.
     */
    setLang: defineDBHandler<[string, string], void>((UUID, lang) => {
        return async (run) => {
            await run("UPDATE `user/data` SET `lang` = ? WHERE `UUID` = ?", [lang, UUID]);
        }
    }),

    /**
     * 특정 UUID의 언어를 가져옵니다.
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