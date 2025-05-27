import { defineRequestHandler } from "@yowza/rrequestor";
import type { DaniType } from "./types";

export namespace DaniClient {
    export const adminRequestor = {
        addVersion: defineRequestHandler<string, void>({
            url: '/admin/api/dani/add-version',
            method: 'post'
        }),
        updateVersion: defineRequestHandler<DaniType.UpdateData, void>({
            url: '/admin/api/dani/update-version',
            method: 'post'
        })
    }
}