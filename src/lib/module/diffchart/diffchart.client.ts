import { defineRequestHandler } from "@yowza/rrequestor";
import { Diffchart } from "./index";

namespace DiffchartClient {
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

Diffchart.Client = DiffchartClient;