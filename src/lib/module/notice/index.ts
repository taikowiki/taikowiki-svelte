import type { defineDBHandler } from "@yowza/db-handler";
import type { RRequestHandler } from "@yowza/rrequestor/types";
import { z } from "zod";

export namespace Notice{
    export declare namespace Client{
        function convertNoticeMd(md: string): string;
        const adminRequest: {
            writeNotice: RRequestHandler<{ notice: Omit<Notice.Notice, "order" | "writtenDate"> }, void>,
            deleteNotice: RRequestHandler<{ order: number }, void>,
            editNotice: RRequestHandler<{ order: number; notice: Omit<Notice.Notice, "order" | "writtenDate"> }, void>
        }
    }
    export declare namespace Server{
        const DBController: {
            getNoticeList: ReturnType<typeof defineDBHandler<[{ page?: number; type?: 'wiki' | 'official' }?], Omit<Notice.Notice, 'content'>[]>>,
            writeNotice: ReturnType<typeof defineDBHandler<[Omit<Notice.Notice, 'writtenDate' | 'order'>], number>>,
            countNotice: ReturnType<typeof defineDBHandler<[], number>>,
            getNoticeByOrder: ReturnType<typeof defineDBHandler<[number], Notice.Notice | null>>,
            editNotice: ReturnType<typeof defineDBHandler<[number, Omit<Notice.Notice, 'writtenDate' | 'order'>], boolean>>,
            deleteNotice: ReturnType<typeof defineDBHandler<[number], void>>,
            getRecentNotices: ReturnType<typeof defineDBHandler<[], { wiki: Omit<Notice.Notice, 'content'>[], official: Omit<Notice.Notice, 'content'>[] }>>
        }
    }
}

export namespace Notice{
    export namespace Schema{
        export const WikiNotice = z.object({
            order: z.number(),
            title: z.string(),
            content: z.string(),
            writtenDate: z.date(),
            type: z.literal('wiki'),
            officialDate: z.null()
        });
        
        export const OfficialNotice = z.object({
            order: z.number(),
            title: z.string(),
            content: z.string(),
            writtenDate: z.date(),
            type: z.literal('official'),
            officialDate: z.date()
        });

        export const Notice = z.union([WikiNotice, OfficialNotice]);
    }

    export type WikiNotice = z.infer<typeof Schema.WikiNotice>;
    export type OfficialNotice = z.infer<typeof Schema.OfficialNotice>;
    export type Notice = z.infer<typeof Schema.Notice>;
}