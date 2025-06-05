import { z } from "zod";

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