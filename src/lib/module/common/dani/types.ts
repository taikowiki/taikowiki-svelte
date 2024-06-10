export interface DaniSong{
    songNo: string;
    difficulty: "easy" | "normal" | "hard" | "oni" | "ura";
}

export type DaniConditionType = "gauge" | "combo" | "score" | "roll" | "hit" | "good" | "ok" | "bad"

export type DaniCondition = {
    type: DaniConditionType;
    criteria: {
        red: number[],
        gold: number[]
    };
};

export interface DaniBase{
    version: "katsudon" | "sorairo" | "momoiro" | "kimidori" | "murasaki" | "white" | "red" | "yellow" | "blue" | "green" | "20" | "21" | "22" | "23" | "24"; //추후에 추가될 지도?
    songs: DaniSong[];
    conditions: DaniCondition[]
}

export interface RegularDani extends DaniBase{
    dan: "senpo" | "jiho" | "chiuken" | "fukusho" | "taisho" | "beginner" | "10kyu" | "9kyu" | "8kyu" | "7kyu" | "6kyu" | "5kyu" | "4kyu" | "3kyu" | "2kyu" | "1kyu" | "1dan" | "2dan" | "3dan" | "4dan" | "5dan" | "6dan" | "7dan" | "8dan" | "9dan" | "10dan" | "kuroto" | "meijin" | "chojin" | "tatsujin";
    name: null;
}

export interface GaidenDani extends DaniBase{
    dan: "gaiden";
    name: string;
}

export type RegularDan = "senpo" | "jiho" | "chiuken" | "fukusho" | "taisho" | "beginner" | "10kyu" | "9kyu" | "8kyu" | "7kyu" | "6kyu" | "5kyu" | "4kyu" | "3kyu" | "2kyu" | "1kyu" | "1dan" | "2dan" | "3dan" | "4dan" | "5dan" | "6dan" | "7dan" | "8dan" | "9dan" | "10dan" | "kuroto" | "meijin" | "chojin" | "tatsujin";
export type GaidenDan = "gaiden";
export type Dan = RegularDan | GaidenDan;

export type Dani = RegularDani | GaidenDani;

export interface DaniDBData {
    order:number;
    version: string;
    data: Dani[];
}