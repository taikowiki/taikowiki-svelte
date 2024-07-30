import { defineRequestHandler } from "@yowza/rrequestor";
import type { DiffchartData } from "./types";

export const diffchartRequestor = {
    save: defineRequestHandler<DiffchartData, void>({
        url: "/admin/api/diffchart/upload",
        method: 'post'
    }),
    remove: defineRequestHandler<{level: number, type: string}, void>({
        url: "/admin/api/diffchart/delete",
        method: 'post'
    })
}