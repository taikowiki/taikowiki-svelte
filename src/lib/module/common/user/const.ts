import type { UserRatingTierName } from "./types";

export const TIER_COLOR = {
    omega: ["#ffa0fe", "#56fbb9", "#63abf8"],
    grandmaster: "#8600e8",
    master: "#00b896",
    sapphire: "#0e76e6",
    ruby: "#ff005d",
    gold: "#e6ac00",
    silver: "#7a7a7a",
    bronze: "#734300",
    pearl: "#e0d7ad"
} as const;

export const TIER_BORDER: Record<UserRatingTierName, number> = {
    omega: 13530,
    grandmaster: 13079,
    master: 12628,
    sapphire: 11275,
    ruby: 9020,
    gold: 6765,
    silver: 4510,
    bronze: 2255,
    pearl: 0
} as const;