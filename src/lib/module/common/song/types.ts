import { GENRE, DIFFICULTY, VERSION, DANIVERSION, DAN } from './const'

export type SongDataPickedForSearch = Pick<SongData, "songNo" | "genre" | "title" | "titleKo" | "aliasKo" | "titleEn" | "aliasEn" | "artists" | "courses"> & { order: number }

export interface SongData {
    songNo: string;
    title: string;
    titleKo: string | null;
    aliasKo: string | null;
    titleEn: string | null;
    aliasEn: string | null;
    bpm: Record<'min' | 'max', number>;
    bpmShiver: 1 | 0;
    version: Version[];
    isAsiaBanned: 1 | 0;
    isKrBanned: 1 | 0;
    genre: Genre[];
    artists: string[];
    addedDate: number | null;
    courses: Record<"easy" | "normal" | "hard" | "oni", Course> & Record<"ura", Course | null>
    isDeleted: 1 | 0;
}

export type Genre = typeof GENRE[number]
export type Difficulty = typeof DIFFICULTY[number]
export interface Course {
    level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    isBranched: 1 | 0;
    maxCombo: number;
    playTime: number;
    balloon: number[];
    rollTime: number[];
    maxDensity: number;
    daniUsed: 1 | 0;
    dani: Dani[];
    images: string[];
}
export type Version = typeof VERSION[number][number]
export type SongLang = "jp" | "ko" | "ako" | "en" | "aen";
export type DaniVersion = typeof DANIVERSION[number];
export type Dan = typeof DAN[number];
export interface Dani {
    version: DaniVersion;
    dan: Dan;
    order: 1 | 2 | 3;
}

//song search option
export interface SongSearchOption {
    query?: string;
    difficulty?: Difficulty | "oniura";
    level?: number;
    genre?: Genre;
}

//request
export interface SongRequest {
    UUID: string;
    ip: string;
    songNo: string;
    createdTime: number;
    type: 'edit' | 'new';
    data: SongData;
    status: 'none' | 'approved' | 'disapproved'
}