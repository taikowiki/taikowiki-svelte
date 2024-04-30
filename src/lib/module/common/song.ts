import { runQuery } from "@sveltekit-board/db";
//import {escape} from 'mysql';

export default class Song {
    static async getAll() {
        return await runQuery(async (run) => {
            let result = await run("SELECT * FROM `song`");
            result.map((e: any) => {
                e.courses = JSON.parse(e.courses);
            })
            return JSON.parse(JSON.stringify(result))
        })
    }

    /*
    static async search(option: SongSearchOption): Promise<SongData[]> {
        let title = option.title?.replace('%', '\\%').replace('_', '\\_') ?? '%';
        let difficultyQuery = option.difficulty && option.level? `AND JSON_EXTRACT(courses, ${escape(`$.${option.difficulty}.level`)}) = ${escape(option.level)}` : '';

        let result = await runQuery(async (run) => {
            return await run(`SELECT * FROM \`song\`
            WHERE
                (\`title\` LIKE ? OR \`titleKo\` LIKE ? OR \`titleEn\` LIKE ? OR \`aliasKo\` LIKE ? OR \`aliasEn\` LIKE ?)
                ${difficultyQuery}
            `, [title, title, title, title, title])
        })

        result.map((song:any) => {
            song.courses = JSON.parse(song.courses)
        })

        return JSON.parse(JSON.stringify(result))
    }
    */
}

/*
export interface SongSearchOption {
    title?: string;
    difficulty?: Difficulty;
    level?: number;
}
*/

export interface SongData {
    songNo: number;
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
    addedDate: number | null;
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