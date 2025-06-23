import { defineRequestHandler } from "@yowza/rrequestor";
import { Dani } from ".";

namespace DaniClient {
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

Dani.Client = DaniClient;