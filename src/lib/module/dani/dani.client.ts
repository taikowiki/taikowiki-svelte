import { defineRequestHandler } from "@yowza/rrequestor";
import type { Dani } from "./types";

export namespace DaniClient {
    export const adminRequest = {
        addVersion: defineRequestHandler<string, void>({
            url: '/admin/api/dani/add-version',
            method: 'post'
        }),
        updateVersion: defineRequestHandler<Dani.UpdateData, void>({
            url: '/admin/api/dani/update-version',
            method: 'post'
        })
    }
}