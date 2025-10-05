import type { getRating } from "@taiko-wiki/taiko-rating";
import type { CardData, ClearData as ClearData_, ScoreData as ScoreData_ } from "node-hiroba/types";
import { I18N } from "$lib/module/i18n";
import type { RRequestHandler } from "@yowza/rrequestor/types";
import type { defineDBHandler } from "@yowza/db-handler";
import type { QueryCallback } from "@yowza/db-handler/types";

export namespace User {
    export const TIER_COLOR = {
        omega: ["#ffa0fe", "#56fbb9", "#63abf8"],
        grandmaster: "#a11313",
        master: "#7d00d9",
        sapphire: "#0e76e6",
        ruby: "#ff005d",
        gold: "#e6ac00",
        silver: "#7a7a7a",
        bronze: "#734300",
        pearl: "#e0d7ad"
    } as const;

    export const TIER_INTERVAL = 2150;
    export const GRADE_INTERVAL = TIER_INTERVAL / 5;
    export const TIER_BORDER: Record<RatingTierName, number> = {
        omega: TIER_INTERVAL * 6, //패치 이전: 13530
        grandmaster: TIER_INTERVAL * 5 + GRADE_INTERVAL * 4, //패치 이전: 13079
        master: TIER_INTERVAL * 5 + GRADE_INTERVAL * 3, //패치 이전:  12628
        sapphire: TIER_INTERVAL * 5, //패치 이전: 11275
        ruby: TIER_INTERVAL * 4, //패치 이전: 9020
        gold: TIER_INTERVAL * 3, //패치 이전: 6765
        silver: TIER_INTERVAL * 2, //패치 이전: 4510
        bronze: TIER_INTERVAL * 1, //패치 이전: 2255
        pearl: 0
    } as const;

    export function getTier(rating: number) {
        let tierName: RatingTierName;
        if (rating < TIER_BORDER.bronze) {
            tierName = 'pearl';
        }
        else if (rating < TIER_BORDER.silver) {
            tierName = 'bronze';
        }
        else if (rating < TIER_BORDER.gold) {
            tierName = 'silver'
        }
        else if (rating < TIER_BORDER.ruby) {
            tierName = 'gold'
        }
        else if (rating < TIER_BORDER.sapphire) {
            tierName = 'ruby'
        }
        else if (rating < TIER_BORDER.master) {
            tierName = 'sapphire'
        }
        else if (rating < TIER_BORDER.grandmaster) {
            tierName = "master"
        }
        else if (rating < TIER_BORDER.omega) {
            tierName = "grandmaster"
        }
        else {
            tierName = 'omega';
        }

        let detailTierGrade: 1 | 2 | 3 | 4 | 5 | null;
        if (tierName === 'omega' || tierName === 'pearl' || tierName === "master" || tierName === "grandmaster") {
            detailTierGrade = null;
        }
        else if (tierName === "sapphire") {
            const startBorder = TIER_BORDER[tierName];

            if (rating < startBorder + GRADE_INTERVAL) {
                detailTierGrade = 3;
            }
            else if (rating < startBorder + GRADE_INTERVAL * 2) {
                detailTierGrade = 2;
            }
            else {
                detailTierGrade = 1;
            }
        }
        else {
            const startBorder = TIER_BORDER[tierName];

            if (rating < startBorder + GRADE_INTERVAL) {
                detailTierGrade = 5;
            }
            else if (rating < startBorder + GRADE_INTERVAL * 2) {
                detailTierGrade = 4;
            }
            else if (rating < startBorder + GRADE_INTERVAL * 3) {
                detailTierGrade = 3;
            }
            else if (rating < startBorder + GRADE_INTERVAL * 4) {
                detailTierGrade = 2;
            }
            else {
                detailTierGrade = 1;
            }
        }

        return {
            tierName,
            detailTierGrade
        }
    }

    export function getNextTier(tierName: RatingTierName): RatingTierName {
        if (tierName === 'pearl') {
            return 'bronze'
        }
        if (tierName === 'bronze') {
            return 'silver'
        }
        if (tierName === 'silver') {
            return 'gold'
        }
        if (tierName === 'gold') {
            return 'ruby'
        }
        if (tierName === 'ruby') {
            return 'sapphire'
        }
        if (tierName === 'sapphire') {
            return 'master'
        }
        if (tierName === "master") {
            return "grandmaster";
        }
        return 'omega'
    }
}

export namespace User {
    export declare namespace Client {
        const request: {
            changeNickname: RRequestHandler<{ newNickname: string; }, string>,
            getUserData: RRequestHandler<null, any>,
            changeShowRating: RRequestHandler<{ nickname?: boolean; taikoNumber?: boolean; songs?: boolean; }, void>
        }
        const donderRequest: {
            updateRating: RRequestHandler<{ rating: number; exp: number; ratingData: DonderData["ratingData"]; }, { count: number; ranking: number; }>,
            getRanking: RRequestHandler<null, { count: number; ranking: number; }>,
        }
        const adminRequest: {
            setGrade: RRequestHandler<{ UUID: string; from: number; to: number; }, void>
        }
    }
    export declare namespace Server {
        const DBController: {
            createData: ReturnType<typeof defineDBHandler<[string, string, object], Data>>;
            getDataByProvider: ReturnType<typeof defineDBHandler<[string, string], Data | null>>;
            getData: ReturnType<typeof defineDBHandler<[string], Data | null>>;
            getNickname: ReturnType<typeof defineDBHandler<[string], string | null>>;
            changeNickname: ReturnType<typeof defineDBHandler<[string, string], void>>;
            deleteUser: ReturnType<typeof defineDBHandler<[string], void>>;
            getAll: ReturnType<typeof defineDBHandler<[], (Data & { order: number })[]>>;
            getAllUnderGrade: ReturnType<typeof defineDBHandler<[number], (Data & { order: number })[]>>;
            setGrade: ReturnType<typeof defineDBHandler<[string, number], void>>;
            setLang: ReturnType<typeof defineDBHandler<[string, string], void>>;
            getLang: ReturnType<typeof defineDBHandler<[string], string | null>>;
            setShowRating: ReturnType<typeof defineDBHandler<[string, Partial<Record<'nickname' | 'taikoNumber' | 'songs', boolean>>], void>>;
            doesUUIDExists: ReturnType<typeof defineDBHandler<[UUID: string], boolean>>
        };

        const donderDBController: {
            updateData: ReturnType<typeof defineDBHandler<[string, { donderData: CardData; clearData: ClearData; scoreData?: ScoreData }]>>;
            getData: ReturnType<typeof defineDBHandler<[string], DonderData | null>>;
            getDataColumns: ReturnType<typeof defineDBHandler<[string, (keyof DonderData)[]], Partial<DonderData> | null>>;
            getClearData: ReturnType<typeof defineDBHandler<[string], ClearData>>;
            updateCurrentRating: ReturnType<typeof defineDBHandler<[string, number, number, DonderData['ratingData']], void>>;
            getRankByRating: ReturnType<typeof defineDBHandler<[string], { count: number; ranking: number }>>;
            getRanking: ReturnType<typeof defineDBHandler<[number], (Pick<User.DonderData, 'UUID' | 'currentRating' | 'donder'> & Pick<User.Data, 'UUID' | 'showRatingNickname' | 'showRatingTaikoNo'> & { currentRating: number; })[]>>;
            count: ReturnType<typeof defineDBHandler<[], number>>;
            getUserRating: ReturnType<typeof defineDBHandler<[string], (DonderData & Pick<User.Data, 'UUID' | 'showRatingNickname' | 'showRatingTaikoNo' | 'showRatingSongs'>) | null>>;
        };

        const apiKeyDBController: {
            generateKey: ((UUID: string) => Promise<string>) & {
                getCallback: (UUID: string) => QueryCallback<string>;
            },
            checkKey: ((key: string) => Promise<string | null>) & {
                getCallback: (key: string) => QueryCallback<string | null>;
            }
        }
    }
}

export namespace User {
    export interface Data {
        order: number;
        provider: string;
        providerId: string;
        UUID: string;
        nickname: string;
        registerTime: number;
        grade: number;
        providerUserData: Object | null;
        lang: I18N.Language;
        showRatingNickname: 0 | 1;
        showRatingTaikoNo: 0 | 1;
        showRatingSongs: 0 | 1;
    }

    export interface DonderData {
        order: number;
        UUID: string;
        donder: CardData;
        clearData: ClearData;
        scoreData: ScoreData | null;
        currentRating: number | null;
        currentExp: number | null;
        ratingHistory: [Date, number][];
        expHistory: [Date, number][];
        lastUpdate: Date;
        ratingData: ReturnType<typeof getRating>['songRatingDatas'] | null;
        lastRatingCalculate: Date | null;
    }

    export type ClearData = ClearData_[];

    export interface ScoreData {
        [songNo: string]: ScoreData_;
    }

    export type RatingTierName = "omega" | "grandmaster" | "master" | "sapphire" | "ruby" | "gold" | "silver" | "bronze" | "pearl";
}