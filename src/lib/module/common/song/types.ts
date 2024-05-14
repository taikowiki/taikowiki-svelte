export interface SongData {
    songNo: string;
    title: string;
    titleKo: string | null;
    aliasKo: string | null;
    titleEn: string | null;
    aliasEn: string | null;
    bpm: Record<'min' | 'max', number>;
    bpmShiver: 1 | 0;
    version: string[];
    isAsiaBanned: 1 | 0;
    isKrBanned: 1 | 0;
    genre: Genre[];
    artists: string[];
    addedDate: number;
    courses: Partial<Record<Difficulty, Course>>
}

export type Genre = "pops" | "anime" | "kids" | "game" | "variety" | "namco" | "vocaloid" | "classic"
export type Difficulty = "easy" | "normal" | "hard" | "oni" | "ura"
export interface Course {
    level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    isBranched: 1 | 0;
    maxCombo: number;
    playTime: number;
    balloon: number[];
    rollTime: number[];
    maxDensity: number;
    daniUsed: 1 | 0;
    dani: {
        version: string;
        dan: string;
        order: number;
    }[];
}
export type SongLang = "jp" | "ko" | "ako" | "en" | "aen";