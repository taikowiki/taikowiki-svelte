import type { Difficulty, Genre } from "$lib/module/common/song/types";

export interface SongSearchOption{
    query?: string;
    difficulty?: Difficulty | "oniura";
    level?: number;
    genre?: Genre;
}