import type { getRating } from "@taiko-wiki/taiko-rating";
import type { CardData, Clear, ClearData, ScoreData } from "node-hiroba/types";
import type { Language } from "../i18n/types";

export interface UserData {
    order: number;
    provider: string;
    providerId: string;
    UUID: string;
    nickname: string;
    registerTime: number;
    grade: number;
    providerUserData: Object | null;
    lang: Language;
    showRatingNickname: 0 | 1;
    showRatingTaikoNo: 0 | 1;
    showRatingSongs: 0 | 1;
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

export type UserRatingTierName = "omega" | "grandmaster" | "master" | "sapphire" | "ruby" | "gold" | "silver" | "bronze" | "pearl";