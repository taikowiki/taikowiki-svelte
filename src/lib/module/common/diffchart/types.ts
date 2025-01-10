import { type Difficulty } from "$lib/module/common/song/types";
import { type SongData } from "$lib/module/common/song/types"

//diffchart
export interface DiffchartSongData {
    songNo: string;
    order: number;
    title: string;
    difficulty: Difficulty;
    option?: Option;
}

export type Song = DiffchartSongData;

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

export interface DiffchartData {
    name: string;
    level: number;
    type: 'clear' | 'fc' | 'dfc';
    data: DiffChart;
    comment: string | null;
}

export type SongDataPickedForDiffchart = Pick<SongData, "songNo" | "genre" | "title" | "titleKo" | "aliasKo">

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

//stringify
export type DiffchartTuple = [name: string, sections: DiffchartSectionTuple[], color?: string, backgroundColor?: string];
export type DiffchartSectionTuple = [name: string, songs: DiffchartSongTuple[], color?: string, backgroundColor?: string];
export type DiffchartSongTuple = [songNo: string, title: string, difficulty: Difficulty];