import { type Difficulty } from "$lib/module/common/song/types";

//diffchart
export interface Song {
    songNo: string;
    order: number;
    title: string;
    difficulty: Difficulty;
    option: Option;
}

export interface Option {
    hardFullCombo: boolean;
    hardFirstAttempt: boolean;
    individualDifficulty: boolean;
}

export interface Section {
    name: string;
    order: number;
    color?: string;
    backgroundColor?: string;
    songs: Song[]
}

export interface DiffChart {
    name: string;
    color?: string;
    backgroundColor?: string;
    sections: Section[];
}

//user score data
export interface SongScore {
    title: string
    songNo: string
    details: Partial<Record<DifficultyType, SongScoreDetail>>
};
export type DifficultyType = "oni_ura" | "oni" | "easy" | "normal" | "hard";
export interface SongScoreDetail {
    crown: CrownType
    badge: BadgeType
};
export type CrownType = "none" | "silver" | "gold" | "donderfull";
export type BadgeType = 0 | 3 | 5 | 4 | 1 | 2 | 6 | 7 | 8;