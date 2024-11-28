import type { Handle } from "@sveltejs/kit";
import { runQuery } from "@yowza/db-handler";

/**
 * Records request logs.
 */
export const logger: Handle = async ({ event, resolve }) => {
    try {
        let UUID: string | null = null;
        if (event.locals.userData) {
            UUID = event.locals.userData.UUID
        }
        await runQuery(async (run) => {
            return await run("INSERT INTO `log` (`UUID`, `ip`, `path`) VALUES (?, ?, ?)", [UUID, event.getClientAddress(), event.url.pathname + event.url.search]);
        })
    }
    catch { }

    return await resolve(event);
}