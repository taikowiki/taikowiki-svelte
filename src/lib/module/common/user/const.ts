import type { UserRatingTierName } from "./types";

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
export const TIER_BORDER: Record<UserRatingTierName, number> = {
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