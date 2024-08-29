import type { SongData } from "$lib/module/common/song/types"
import { DANIVERSION, DAN } from "../song/const";

export interface DaniSong {
    songNo: string | null;
    difficulty: "easy" | "normal" | "hard" | "oni" | "ura";
}

export type DaniConditionType = "gauge" | "combo" | "score" | "roll" | "hit" | "good" | "ok" | "bad" | "score_sum"

export type DaniCondition = {
    type: DaniConditionType;
    criteria: {
        red: number[],
        gold: number[]
    };
};

export interface DaniBase {
    version: typeof DANIVERSION[number]
    songs: DaniSong[];
    conditions: DaniCondition[]
}

export interface RegularDani extends DaniBase {
    dan: RegularDan
    name: null;
}

export interface GaidenDani extends DaniBase {
    dan: GaidenDan;
    name: Record<string, string>;
    qr?: string;
}

export type RegularDan = Exclude<typeof DAN[number], "gaiden">;
export type GaidenDan = "gaiden";
export type Dan = RegularDan | GaidenDan;

export type Dani = RegularDani | GaidenDani;

export interface DaniDBData {
    order: number;
    version: string;
    data: Dani[];
}

export type SongDataPickedForDani = Pick<SongData, "songNo" | "genre" | "title" | "courses">