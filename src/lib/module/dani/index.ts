import { z } from "zod";
import { Song } from "../song";
import type { defineRequestHandler } from "@yowza/rrequestor";
import type { defineDBHandler } from "@yowza/db-handler";

const { DANIVERSION, DIFFICULTY, REGULAR_DAN } = Song.CONST;

export namespace Dani{
    export declare namespace Client{
        const adminRequest: {
            addVersion: ReturnType<typeof defineRequestHandler<string, void>>;
            updateVersion: ReturnType<typeof defineRequestHandler<Dani.UpdateData, void>>;
        }
    }
    export declare namespace Server{
        const DBController: {
            getAll: ReturnType<typeof defineDBHandler<[], Dani.DB[]>>;
            getByVersion: ReturnType<typeof defineDBHandler<[string], Dani.DB | null>>;
            getVersions: ReturnType<typeof defineDBHandler<[], Partial<Song.DaniVersion>[]>>;
            hasVersion: ReturnType<typeof defineDBHandler<[string]>>;
            addVersion: ReturnType<typeof defineDBHandler<[string, Dani.Dani[]?]>>;
            updateVersion: ReturnType<typeof defineDBHandler<[Dani.UpdateData]>>;
        }
    }
}

export namespace Dani {
    export namespace Schema{
        export const Song = z.object({
            songNo: z.union([z.string(), z.null()]),
            difficulty: z.enum(DIFFICULTY)
        });
        export const ConditionType = z.union([z.literal("gauge"), z.literal("combo"), z.literal("score"), z.literal("roll"), z.literal("hit"), z.literal("good"), z.literal("ok"), z.literal("bad"), z.literal("score_sum")]);
        export const Condition = z.object({
            type: ConditionType,
            criteria: z.object({
                red: z.array(z.number()),
                gold: z.array(z.number())
            })
        });
        export const RegularDan = z.enum(REGULAR_DAN);
        export const RegularDani = z.object({
            version: z.enum(DANIVERSION),
            songs: z.array(Song),
            conditions: z.array(Condition),
            dan: RegularDan,
            name: z.null()
        });
        export const GaidenDani = z.object({
            version: z.enum(DANIVERSION),
            songs: z.array(Song),
            conditions: z.array(Condition),
            dan: z.literal('gaiden'),
            name: z.record(z.string()),
            qr: z.optional(z.string())
        });
        export const Dani = z.union([RegularDani, GaidenDani]);
        export const DaniVersion = z.enum(DANIVERSION);
        
        export const DB = z.object({
            order: z.number(),
            version: DaniVersion,
            data: z.array(Dani)
        });

        export const UpdateData = z.object({
            version: DaniVersion,
            data: z.array(Dani)
        })
    }

    export type Song = z.infer<typeof Schema.Song>;
    export type ConditionType = z.infer<typeof Schema.ConditionType>;
    export type Condition = z.infer<typeof Schema.Condition>;
    export interface Base {
        version: typeof DANIVERSION[number]
        songs: Song[];
        conditions: Condition[]
    }
    export type RegularDani = z.infer<typeof Schema.RegularDani>;
    export type GaidenDani = z.infer<typeof Schema.GaidenDani>;
    export type RegularDan = z.infer<typeof Schema.RegularDan>;
    export type GaidenDan = "gaiden";
    export type Dan = RegularDan | GaidenDan;
    export type Dani = z.infer<typeof Schema.Dani>;
    export type DB = z.infer<typeof Schema.DB>;
    export type SongDataForDisplay = Pick<Song.SongData, "songNo" | "genre" | "title" | "courses">

    export type UpdateData = z.infer<typeof Schema.UpdateData>;
}