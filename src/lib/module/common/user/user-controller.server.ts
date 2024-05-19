import { runQuery } from "@sveltekit-board/db";

export default class UserController {
    static async getBasicData(provider: string, providerId: string) {
        return await runQuery(async (run) => {
            const result = await run(`SELECT * FROM \`user\` WHERE \`provider\` = ? AND \`providerId\` = ?`, [provider, providerId]);

            if (result.length !== 0) return result[0];

            const userBasicData: Partial<UserBasicData> = {
                provider,
                providerId,
                registerTime: Date.now(),
                grade: 2
            }

            const r = await run(`INSERT INTO \`user\` (\`provider\`, \`providerId\`, \`registerTime\`, \`grade\`) VALUES (?, ?, ?, ?)`, [userBasicData.provider, userBasicData.providerId, userBasicData.registerTime, userBasicData.grade]);

            return (await run(`SELECT * FROM \`user\` WHERE \`order\` = ?`, [r.insertId]) as UserBasicData[])[0]
        })
    }
}

export interface UserBasicData {
    order: number;
    provider: string;
    providerId: string;
    registerTime: number;
    grade: number;
}