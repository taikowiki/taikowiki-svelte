import { error, type Handle } from "@sveltejs/kit";
import { runQuery } from "@sveltekit-board/db";

/**
 * Ban specific Ip.
 */
export default class BanController {
    static checkIp: Handle = async ({ event, resolve }) => {
        const banned = await runQuery(async (run) => {
            let clientAddress: string;
            try {
                clientAddress = event.getClientAddress();
                const result = await run("SELECT COUNT(*) FROM `ban/ip` WHERE `ip` = ?", [clientAddress]);
                if (Object.values(result[0]) === undefined) {
                    return false;
                }
                return Object.values(result[0])?.[0] !== 0;
            }
            catch {
                return false;
            }
        })

        if (banned) {
            throw error(403, 'Your IP Address has been BANNED.')
        }

        return await resolve(event);
    }
}