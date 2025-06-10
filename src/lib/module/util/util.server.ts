import type { RequestEvent } from "@sveltejs/kit";
import { Util } from ".";

namespace UtilServer {
    export function getClientAddress(event: RequestEvent) {
        return event.request.headers.get('x-forwarded-for') || event.getClientAddress();
    }
}

Util.Server = UtilServer;