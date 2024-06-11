import { runQuery } from "@sveltekit-board/db";
import type { UserData } from "./types";
//@ts-expect-error
import groupBy from "object.groupby";

export default class UserController {
    static async setData(provider: string, providerId: string, providerUserData: Object) {
        return await runQuery(async (run) => {
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

            const r = await run(`INSERT INTO \`user/data\` (\`provider\`, \`providerId\`, \`nickname\`, \`UUID\`) VALUES (?, ?, ?, ?)`, [userData.provider, userData.providerId, userData.nickname, userData.UUID]);

            return (await run(`SELECT * FROM \`user/basic_data\` WHERE \`order\` = ?`, [r.insertId]) as UserData[])[0]
        })
    }

    static async getData(provider: string, providerId: string): Promise<UserData | null> {
        return await runQuery(async (run) => {
            const result = await run(`SELECT * FROM \`user/data\` WHERE \`provider\` = ? AND \`providerId\` = ?`, [provider, providerId]);

            if (result.length !== 0) {
                const userData = result[0];
                if (userData.providerUserData) {
                    userData.providerUserData = JSON.parse(userData.providerUserData);
                }
                return userData;
            }// 유저 존재

            return null;
        })
    }

    static async getNickname(UUID: string): Promise<string | null> {
        return await runQuery(async (run) => {
            return (await run("SELECT `nickname` FROM `user/data` WHERE `UUID` = ?", [UUID]))[0]?.nickname ?? null
        })
    }

    static async changeNickname(provider: string, providerId: string, newNickname: string) {
        if (!/^([a-zA-Z가-힣0-9\-]*)$/.test(newNickname)) throw new Error('New nickname is not in the correct format');
        return await runQuery(async (run) => {
            if ((await run(`SELECT \`order\` FROM \`user/data\` WHERE \`nickname\` = ?`, [newNickname])).length !== 0) throw new Error('Duplicated Nickname');
            return await run(`UPDATE \`user/data\` SET \`nickname\` = ? WHERE \`provider\` = ? AND \`providerId\` = ?`, [newNickname, provider, providerId])
        })
    }

    static async deleteUser(provider: string, providerId: string) {
        return await runQuery(async (run) => {
            await run(`DELETE FROM \`user/data\` WHERE \`provider\` = ? AND \`providerId\` = ?;`, [provider, providerId]);
            await run(`DELETE FROM \`user/basic_data\` WHERE \`provider\` = ? AND \`providerId\` = ?;`, [provider, providerId]);
        })
    }
}