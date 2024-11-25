import type { getRating } from "@taiko-wiki/taiko-rating";
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
    currentExp: number | null;
    ratingHistory: number[];
    expHistory: number[];
    lastUpdate: Date;
    ratingData: ReturnType<typeof getRating>['songRatingDatas'] | null;
    lastRatingCalculate: Date | null;
}

export type UserClearData = ClearData[];

export interface UserScoreData {
    [songNo: string]: ScoreData;
}

export type UserRatingTierName = "omega" | "sapphire" | "ruby" | "gold" | "silver" | "bronze" | "pearl";