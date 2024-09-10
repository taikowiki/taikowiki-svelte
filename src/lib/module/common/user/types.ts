import type { CardData, Clear, ClearData, ScoreData } from "node-hiroba/types";

export interface UserData {
    order: number;
    provider: string;
    providerId: string;
    UUID: string;
    nickname: string;
    registerTime: number;
    grade: number;
    providerUserData: Object | null;
}

export interface UserDonderData {
    order: number;
    UUID: string;
    donder: CardData;
    clearData: ClearData[];
    scoreData: UserScoreData | null;
    currentRating: number | null;
    ratingHistory: number[];
    lastUpdate: Date;
}

export type UserClearData = ClearData[];

export type UserScoreData = Record<string, ScoreData>

export type UserRatingTierName = "omega" | "sapphire" | "ruby" | "gold" | "silver" | "bronze" | "pearl";