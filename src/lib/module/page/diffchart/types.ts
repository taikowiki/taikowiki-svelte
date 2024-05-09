import { type Difficulty } from "$lib/module/common/song/types";

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