import { userDonderDBController } from '$lib/module/common/user/user.server.js';
import type {
    BadgeType,
    CrownType,
    DifficultyType,
    SongScore,
    SongScoreDetail,
} from "$lib/module/common/diffchart/types";
import { type UserDonderData } from '$lib/module/common/user/types.js';
import type { Clear, Difficulty } from "node-hiroba/types";


export async function load({ locals }) {
    let donderDataResult = null;
    if (locals.userData !== null) {
        donderDataResult = await userDonderDBController.getData(locals.userData.UUID);
        if(donderDataResult){
            donderDataResult = parseSongScoreDonderData(donderDataResult);
        }
    }

    return {
        donderData: donderDataResult
    }
}

function parseSongScoreDonderData(data: UserDonderData): SongScore[] | null {
    const result: SongScore[] = [];
    try {
        for (let scoreData of data.clearData) {
            const details: Partial<Record<DifficultyType, SongScoreDetail>> = parseDetail(scoreData.difficulty);
            const score: SongScore = {
                title: scoreData.title,
                songNo: scoreData.songNo,
                details: details,
            };
            result.push(score);
        }
        return result;
    } catch (err) {
        console.warn(err);
        return null;
    }
}

function parseDetail(data: Partial<Record<Difficulty, Clear>>): Partial<Record<DifficultyType, SongScoreDetail>> {
    const result: Partial<Record<DifficultyType, SongScoreDetail>> = {};

    if (data.ura !== null && data.ura !== undefined) {
        result.oni_ura = {
            crown: crowntoCrownType(data.ura.crown),
            badge: badgetoBadgeType(data.ura.badge),
        }
    }

    if (data.oni !== null && data.oni !== undefined) {
        result.oni = {
            crown: crowntoCrownType(data.oni.crown),
            badge: badgetoBadgeType(data.oni.badge),
        }
    }

    return result;
}

function crowntoCrownType(crown: string | null): CrownType {
    switch (crown) {
        case 'silver':
            return "silver";
        case 'gold':
            return "gold";
        case 'donderfull':
            return "donderfull";
    }

    return "none";
}

function badgetoBadgeType(badge: string | null): BadgeType {
    switch (badge) {
        case 'rainbow':
            return 8;
        case 'purple':
            return 7;
        case 'pink':
            return 6;
        case 'gold':
            return 5;
        case 'silver':
            return 4;
        case 'bronze':
            return 3;
        case 'white':
            return 2;
    }

    return 0;
}