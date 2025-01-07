import { getClientAddress } from "$lib/module/common/util.server";
import type { Handle } from "@sveltejs/kit";
import { runQuery } from "@yowza/db-handler";

/**
 * Records request logs.
 */
const logger: Handle = async ({ event, resolve }) => {
    let UUID: string | null = null;
    if (event.locals.userData) {
        UUID = event.locals.userData.UUID
    }
    await runQuery(async (run) => {
        return await run("INSERT INTO `log` (`UUID`, `ip`, `path`) VALUES (?, ?, ?)", [UUID, getClientAddress(event), event.url.pathname]);
    })

    return await resolve(event);
}

export default logger