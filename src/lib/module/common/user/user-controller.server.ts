import { runQuery } from "@sveltekit-board/db";
import type { UserBasicData, UserData } from "./types";
import groupBy from "object.groupby";

export default class UserController {
    static async getBasicData(provider: string, providerId: string): Promise<UserBasicData> {
        return await runQuery(async (run) => {
            const result = await run(`SELECT * FROM \`user/basicData\` WHERE \`provider\` = ? AND \`providerId\` = ?`, [provider, providerId]);

            if (result.length !== 0) return result[0]; //유저 존재

            const userBasicData: Partial<UserBasicData> = {
                provider,
                providerId,
                registerTime: Date.now(),
                grade: 2
            }

            const r = await run(`INSERT INTO \`user/basicData\` (\`provider\`, \`providerId\`, \`registerTime\`, \`grade\`) VALUES (?, ?, ?, ?)`, [userBasicData.provider, userBasicData.providerId, userBasicData.registerTime, userBasicData.grade]);

            return (await run(`SELECT * FROM \`user/basicData\` WHERE \`order\` = ?`, [r.insertId]) as UserBasicData[])[0]
        })
    }

    static async getData(provider: string, providerId: string): Promise<UserData> {
        return await runQuery(async (run) => {
            const result = await run(`SELECT * FROM \`user/data\` WHERE \`provider\` = ? AND \`providerId\` = ?`, [provider, providerId]);

            if (result.length !== 0) return result[0];// 유저 존재

            const UUID = Object.values(groupBy(Array.from(((Date.now() * Math.random()).toString(32).replace('.', '') + (Date.now() * Math.random()).toString(32).replace('.', '')).slice(0, 16)), (_, i) => i % 4)).map(e => (e as string[]).join('')).join('-')

            const userData: Partial<UserData> = {
                provider,
                providerId,
                nickname: UUID,
                UUID
            }

            const r = await run(`INSERT INTO \`user/data\` (\`provider\`, \`providerId\`, \`nickname\`, \`UUID\`) VALUES (?, ?, ?, ?)`, [userData.provider, userData.providerId, userData.nickname, userData.UUID]);

            return (await run(`SELECT * FROM \`user/basicData\` WHERE \`order\` = ?`, [r.insertId]) as UserData[])[0]
        })
    }

    static async changeNickname(provider:string, providerId:string, newNickname:string){
        if(!/^([a-zA-Z가-힣0-9\-]*)$/.test(newNickname)) throw new Error('New nickname is not in the correct format');
        return await runQuery(async (run) => {
            if((await run(`SELECT \`order\` FROM \`user/data\` WHERE \`nickname\` = ?`, [newNickname])).length !== 0) throw new Error('Duplicated Nickname');
            return await run(`UPDATE \`user/data\` SET \`nickname\` = ? WHERE \`provider\` = ? AND \`providerId\` = ?`, [newNickname, provider, providerId])
        })
    }

    static async deleteUser(provider:string, providerId:string){
        return await runQuery(async(run) => {
            await run(`DELETE FROM \`user/data\` WHERE \`provider\` = ? AND \`providerId\` = ?;`, [provider, providerId]);
            await run(`DELETE FROM \`user/basicData\` WHERE \`provider\` = ? AND \`providerId\` = ?;`, [provider, providerId]);
        })
    }
}