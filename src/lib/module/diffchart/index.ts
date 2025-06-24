import LZUTF8 from "lzutf8";
import { z } from "zod";
import { Song } from "../song";
import type { defineRequestHandler } from "@yowza/rrequestor";
import type { defineDBHandler } from "@yowza/db-handler";

const { DIFFICULTY } = Song.CONST;

// module
export namespace Diffchart {
    /**
     * Decode stringified diffchart to object.
     * @param hash 
     * @returns 
     */
    export function decodeDiffchart(hash: string) {
        const stringifiedCompressed = decodeURIComponent(atob(hash));
        const compressed = Uint8Array.from(JSON.parse(stringifiedCompressed));
        const stringified = LZUTF8.decompress(compressed);
        const diffchart = JSON.parse(stringified);
        if (Array.isArray(diffchart)) { // tuple 형식
            return detuplify(diffchart as Diffchart.Tuple.DiffchartTuple);
        }
        else { // object 형식
            return diffchart;
        }
    }

    /**
     * Encode diffchart object to string.
     * @param diffchart 
     * @returns 
     */
    export function encodeDiffchart(diffchart: Diffchart.Diffchart) {
        const diffchartTuple = tuplify(diffchart);
        const stringified = JSON.stringify(diffchartTuple);
        const compressed = LZUTF8.compress(stringified, {
            outputEncoding: "ByteArray",
        });
        const stringifiedCompressed = JSON.stringify(Array.from(compressed));
        return btoa(encodeURIComponent(stringifiedCompressed));
    }

    /**
     * Convert diffchart object to tuple.
     * @param diffchart 
     * @returns 
     */
    function tuplify(diffchart: Diffchart.Diffchart) {
        diffchart.sections.sort((a, b) => a.order - b.order);
        diffchart.sections.forEach((section) => {
            section.songs.sort((a, b) => a.order - b.order);
        })

        const diffchartTuple: Diffchart.Tuple.DiffchartTuple = [
            diffchart.name,
            diffchart.sections.map((section): Diffchart.Tuple.SectionTuple => {
                return [
                    section.name,
                    section.songs.map((song): Diffchart.Tuple.SongTuple => {
                        return [
                            song.songNo,
                            song.title,
                            song.difficulty
                        ]
                    }),
                    section.color,
                    section.backgroundColor
                ]
            }),
            diffchart.color,
            diffchart.backgroundColor
        ]

        return diffchartTuple;
    }

    /**
     * Convert diffchart tuple to object.
     * @param diffchartTuple 
     * @returns 
     */
    function detuplify(diffchartTuple: Diffchart.Tuple.DiffchartTuple) {
        const diffchart: Diffchart.Diffchart = {
            name: diffchartTuple[0],
            sections: diffchartTuple[1].map((sectionTuple, i): Diffchart.Section => {
                return {
                    name: sectionTuple[0],
                    songs: sectionTuple[1].map((songTuple, i): Diffchart.Song => {
                        return {
                            songNo: songTuple[0],
                            title: songTuple[1],
                            difficulty: songTuple[2],
                            order: i
                        }
                    }),
                    order: i,
                    color: sectionTuple[2],
                    backgroundColor: sectionTuple[3]
                }
            }),
            color: diffchartTuple[2],
            backgroundColor: diffchartTuple[3]
        };

        return diffchart;
    }
}

// client/server
export namespace Diffchart {
    export declare namespace Client {
        const request: {
            save: ReturnType<typeof defineRequestHandler<Diffchart.DiffchartData, void>>,
            remove: ReturnType<typeof defineRequestHandler<{ level: number, type: string }, void>>
        }
    }
    export declare namespace Server {
        const DBController: {
            getClearByLevel: ReturnType<typeof defineDBHandler<[number], (Diffchart.DiffchartData & { order: number }) | null>>,
            getFullcomboByLevel: ReturnType<typeof defineDBHandler<[number], (Diffchart.DiffchartData & { order: number }) | null>>,
            getDonderfullcomboByLevel: ReturnType<typeof defineDBHandler<[number], (Diffchart.DiffchartData & { order: number }) | null>>,
            getAll: ReturnType<typeof defineDBHandler<[], (Diffchart.DiffchartData & { order: number })[]>>,
            uploadDiffchart: ReturnType<typeof defineDBHandler<[Diffchart.DiffchartData], void>>,
            deleteDiffchart: ReturnType<typeof defineDBHandler<[number, string], void>>
        }

        // function parseDiffchart(e: any): void;
        // function sortDiffchart(a: Diffchart.DiffchartData, b: Diffchart.DiffchartData): number;
        // function typeToNum(type: 'clear' | 'fc' | 'dfc'): 0 | 1 | 2 | 3;
    }
}

// types
export namespace Diffchart {
    export namespace Schema {
        // diffchart
        export const Option = z.object({
            hardFullCombo: z.boolean(),
            hardFirstAttempt: z.boolean(),
            individualDifficulty: z.boolean(),
        });
        export const Song = z.object({
            songNo: z.string(),
            order: z.number(),
            title: z.string(),
            difficulty: z.enum(DIFFICULTY),
            //option: Option
        });
        export const Section = z.object({
            name: z.string(),
            order: z.number(),
            color: z.optional(z.string()),
            backgroundColor: z.optional(z.string()),
            songs: z.array(Song)
        });
        export const Diffchart = z.object({
            name: z.string(),
            color: z.optional(z.string()),
            backgroundColor: z.optional(z.string()),
            sections: z.array(Section)
        });
        export const DiffchartData = z.object({
            name: z.string(),
            level: z.number(),
            type: z.enum(['clear', 'fc', 'dfc']),
            data: Diffchart,
            comment: z.union([z.string(), z.null()])
        });

        // user score
        export namespace Score {
            export const Difficulty = z.enum(["oni_ura", "oni", "easy", "normal", "hard"]);
            export const Crown = z.enum(["none", "silver", "gold", "donderfull"]);
            export const Badge = z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8)]);
            export const Detail = z.object({
                crown: Crown,
                badge: Badge
            })
            export const SongScore = z.object({
                title: z.string(),
                songNo: z.string(),
                details: z.record(Difficulty, Detail)
            })
        }

        export namespace Tuple {
            export const SongTuple = z.tuple([z.string(), z.string(), z.enum(DIFFICULTY)]);
            export const SectionTuple = z.tuple([z.string(), z.array(SongTuple), z.optional(z.string()), z.optional(z.string())]);
            export const DiffchartTuple = z.tuple([z.string(), z.array(SectionTuple), z.optional(z.string()), z.optional(z.string())]);
        }
    }

    // diffchart
    export type Option = z.infer<typeof Schema.Option>;
    export type Song = z.infer<typeof Schema.Song>;
    export type Section = z.infer<typeof Schema.Section>;
    export type Diffchart = z.infer<typeof Schema.Diffchart>;
    export type DiffchartData = z.infer<typeof Schema.DiffchartData>;

    // user score
    export namespace Score {
        export type Difficulty = z.infer<typeof Schema.Score.Difficulty>;
        export type Crown = z.infer<typeof Schema.Score.Crown>;
        export type Badge = z.infer<typeof Schema.Score.Badge>;
        export type Detail = z.infer<typeof Schema.Score.Detail>;
        export type SongScore = z.infer<typeof Schema.Score.SongScore>;
    }

    // tuple
    export namespace Tuple {
        export type SongTuple = [songNo: string, title: string, difficulty: Song.Difficulty];
        export type SectionTuple = [name: string, songs: SongTuple[], color?: string, backgroundColor?: string];
        export type DiffchartTuple = [name: string, sections: SectionTuple[], color?: string, backgroundColor?: string];
    }

    export type SongDataForDisplay = Pick<Song.SongData, "songNo" | "genre" | "title" | "titleKo" | "aliasKo">;
}

export default Diffchart;