import { defineRequestHandler } from "@yowza/rrequestor";
import { type Diffchart } from "./index";

export namespace DiffchartClient {
    export const request = {
        save: defineRequestHandler<Diffchart.DiffchartData, void>({
            url: "/admin/api/diffchart/upload",
            method: 'post'
        }),
        remove: defineRequestHandler<{ level: number, type: string }, void>({
            url: "/admin/api/diffchart/delete",
            method: 'post'
        })
    }
}