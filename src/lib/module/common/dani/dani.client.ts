import { defineRequestHandler } from "@yowza/rrequestor";
import type { DaniUpdateData } from "./types";

export const daniAdminRequestor = {
    addVersion: defineRequestHandler<string, void>({
        url: '/admin/api/dani/add-version',
        method: 'post'
    }),
    updateVersion: defineRequestHandler<DaniUpdateData, void>({
        url: '/admin/api/dani/update-version',
        method: 'post'
    })
}