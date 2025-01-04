import { TIER_BORDER } from "./const";
import type { UserRatingTierName } from "./types";

export function getTier(rating: number) {
    let tierName: UserRatingTierName;
    if (rating < 2255) {
        tierName = 'pearl';
    }
    else if (rating < 4510) {
        tierName = 'bronze';
    }
    else if (rating < 6765) {
        tierName = 'silver'
    }
    else if (rating < 9020) {
        tierName = 'gold'
    }
    else if (rating < 11275) {
        tierName = 'ruby'
    }
    else if (rating < 12628) {
        tierName = 'sapphire'
    }
    else if (rating < 13079) {
        tierName = "master"
    }
    else if (rating < 13530) {
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

        if (rating < startBorder + 451) {
            detailTierGrade = 3;
        }
        else if (rating < startBorder + 451 * 2) {
            detailTierGrade = 2;
        }
        else {
            detailTierGrade = 1;
        }
    }
    else {
        const startBorder = TIER_BORDER[tierName];

        if (rating < startBorder + 451) {
            detailTierGrade = 5;
        }
        else if (rating < startBorder + 451 * 2) {
            detailTierGrade = 4;
        }
        else if (rating < startBorder + 451 * 3) {
            detailTierGrade = 3;
        }
        else if (rating < startBorder + 451 * 4) {
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