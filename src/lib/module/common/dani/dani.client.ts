import { defineRequestHandler } from "@yowza/rrequestor";

export const daniAdminRequestor = {
    addVersion: defineRequestHandler<string, void>({
        url: '/admin/api/dani/add-version',
        method: 'post'
    })
}