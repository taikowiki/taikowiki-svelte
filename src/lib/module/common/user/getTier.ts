import { GRADE_INTERVAL, TIER_BORDER } from "./const";
import type { UserRatingTierName } from "./types";

export function getTier(rating: number) {
    let tierName: UserRatingTierName;
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

export function getNextTier(tierName: UserRatingTierName): UserRatingTierName {
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