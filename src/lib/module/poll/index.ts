import { z } from "zod";
import type { PollClient } from "./poll.client";
import type { PollServer } from "./poll.server";

// client/server
export namespace Poll {
    export declare let Client: Readonly<typeof PollClient>;
    export declare let Server: Readonly<typeof PollServer>;

    export async function importClient(){
        await import('./poll.client');
    }
    export async function importServer(){
        await import('./poll.server');
    }
}

// types
export namespace Poll {
    export namespace Schema {
        export const OptionedSection = z.object({
            question: z.string(),
            options: z.array(z.string()),
            useFree: z.optional(z.boolean())
        });
        export const FreeSection = z.object({
            question: z.string()
        })
        export const Section = z.union([OptionedSection, FreeSection]);
        export const DataWithoutId = z.object({
            sections: z.array(Section),
            until: z.date(),
            memo: z.optional(z.string())
        });
        export const Data = z.intersection(DataWithoutId, z.object({ id: z.number() }));

        export const AnswerReqData = z.object({
            dataId: z.number(),
            answers: z.array(z.string())
        });
        export const Answer = z.intersection(AnswerReqData, z.object({
            responderUUID: z.string()
        }));

        export const DBDataRow = z.object({
            id: z.number(),
            until: z.date(),
            memo: z.union([z.string(), z.null()])
        });
        export const DBSectionRow = z.object({
            dataId: z.number(),
            question: z.string(),
            sectionIndex: z.number(),
            useFree: z.number()
        });
        export const DBOptionRow = z.union([
            z.object({
                dataId: z.number(),
                optionIndex: z.null(),
                sectionIndex: z.number(),
                type: z.literal(0),
                value: z.null()
            }),
            z.object({
                dataId: z.number(),
                optionIndex: z.number(),
                sectionIndex: z.number(),
                type: z.literal(1),
                value: z.string()
            })
        ]);
        export const DBAnswerRow = z.object({
            dataId: z.number(),
            responserUUID: z.string(),
            sectionIndex: z.number(),
            value: z.string()
        })
    }

    export type OptionedSection = z.infer<typeof Schema.OptionedSection>
    export type FreeSection = z.infer<typeof Schema.FreeSection>;
    export type Section = z.infer<typeof Schema.Section>;
    export type DataWithoutId = z.infer<typeof Schema.DataWithoutId>;
    export type Data = z.infer<typeof Schema.Data>;

    export type AnswerReqData = z.infer<typeof Schema.AnswerReqData>;
    export type Answer = z.infer<typeof Schema.Answer>;

    export type DBDataRow = z.infer<typeof Schema.DBDataRow>;
    export type DBSectionRow = z.infer<typeof Schema.DBSectionRow>;
    export type DBOptionRow = z.infer<typeof Schema.DBOptionRow>;
    export type DBAnswerRow = z.infer<typeof Schema.DBAnswerRow>;
}