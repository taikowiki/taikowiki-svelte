import deepFreeze from "./deepFreeze";
import type { Difficulty, Genre } from "./song/types";

export const genre: Record<Genre, string> = {
    pops: "#4fb5bd",
    vocaloid: '#a7abc7',//"#a5d1da",
    anime: "#e28dc8",
    namco: "#EB6B6A",
    game: "#b697d3",
    variety: "#40c977",
    classic: "#ccbd4a",
    kids: "#ebb850"
} as const;

export const difficulty: Record<Difficulty | "oniura", string> = {
    "easy": "#ff2703",
    "normal": "#647e2f",
    "hard": "#364938",
    "oni": "#db1885",
    "ura": "#7135db",
    "oniura": "linear-gradient(rgb(219, 24, 133) 0%, rgb(219, 24, 133) 50%, rgb(113, 53, 219) 50%, rgb(113, 53, 219) 100% )"
} as const;

export const darkDifficulty: Record<Difficulty, string> = {
    "easy": "#ff2703",
    "normal": "#647e2f",
    "hard": "#364938",
    "oni": "#d64d9a",
    "ura": "#946ade"
} as const;

export const dani = {
    backgroundColor: {
        light: {
            kyu: '#FFF0D3',
            lowdan: '#E2EBEE',
            highdan: '#EEE2E2',
            jin: '#E5F2F5',
            tatsujin: '#F8EDC8',
            jiho: '#ffd096',
            chiuken: '#ba9779',
            fukusho: '#524c4a',
            gaiden: "#9dbdad"
        } as const,
        dark: {
            kyu: '#5D5A40',
            lowdan: '#40565D',
            highdan: '#5F4242',
            jin: '#80959C',
            tatsujin: '#8E8C51',
            jiho: '#ffd096',
            chiuken: '#ba9779',
            fukusho: '#524c4a',
            gaiden: "#638072"
        } as const
    } as const,
    color: {
        light: {
            kyu: '#edc16f',
            lowdan: '#73C5FF',
            highdan: '#E65252',
            jin: '#91a3a8',
            tatsujin: '#F4BC2B',
            jiho: '#f6ae54',
            chiuken: "#bc773f",
            fukusho: "#2b2827",
            gaiden: "#558f72"
        } as const,
        dark: {
            kyu: '#D8B97F',
            lowdan: '#4F92CF',
            highdan: '#BC5353',
            jin: '#91a3a8',
            tatsujin: '#F4BC2B',
            jiho: '#f6ae54',
            chiuken: "#bc773f",
            fukusho: "#2b2827",
            gaiden: "#558f72"
        } as const
    } as const
} as const

const color = {
    genre,
    difficulty,
    darkDifficulty,
    dani
} as const

deepFreeze(color);

export default color;