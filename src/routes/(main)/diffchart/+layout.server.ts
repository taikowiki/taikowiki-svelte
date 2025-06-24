import { User } from "$lib/module/user";
import '$lib/module/user/user.server';
import type { Diffchart } from '$lib/module/diffchart';
import type { Clear, ClearData, Difficulty } from "node-hiroba/types";
import { Song } from '$lib/module/song/song.server';

export async function load({ locals }) {
    let donderDataResult = null;
    if (locals.userData) {
        donderDataResult = await User.Server.donderDBController.getClearData(
            locals.userData.UUID
        );
        donderDataResult &&= parseSongScoreDonderData(donderDataResult);
    }

    const songs = (await Song.Server.DBController.getAllColumns([
        "genre",
        "songNo",
        "title",
        "titleKo",
        "aliasKo",
    ])) as Diffchart.SongDataForDisplay[];

    return {
        donderData: donderDataResult,
        songs,
    };
}

function parseSongScoreDonderData(clearData: ClearData[]): Diffchart.Score.SongScore[] | null {
    try {
        return clearData.map((c) => {
            const details: Partial<Record<Diffchart.Score.Difficulty, Diffchart.Score.Detail>> =
                parseDetail(c.difficulty);
            const score: Diffchart.Score.SongScore = {
                title: c.title,
                songNo: c.songNo,
                details,
            };
            return score;
        });
    } catch (err) {
        console.warn(err);
        return null;
    }
}

function parseDetail(
    data: Partial<Record<Difficulty, Clear>>
): Partial<Record<Diffchart.Score.Difficulty, Diffchart.Score.Detail>> {
    const result: Partial<Record<Diffchart.Score.Difficulty, Diffchart.Score.Detail>> = {};
    if (data.ura) {
        result.oni_ura = {
            crown: crowntoCrownType(data.ura.crown),
            badge: badgetoBadgeType(data.ura.badge),
        };
    }
    if (data.oni) {
        result.oni = {
            crown: crowntoCrownType(data.oni.crown),
            badge: badgetoBadgeType(data.oni.badge),
        };
    }
    return result;
}

function crowntoCrownType(crown: string | null): Diffchart.Score.Crown {
    switch (crown) {
        case "silver":
            return "silver";
        case "gold":
            return "gold";
        case "donderfull":
            return "donderfull";
    }

    return "none";
}

function badgetoBadgeType(badge: string | null): Diffchart.Score.Badge {
    switch (badge) {
        case "rainbow":
            return 8;
        case "purple":
            return 7;
        case "pink":
            return 6;
        case "gold":
            return 5;
        case "silver":
            return 4;
        case "bronze":
            return 3;
        case "white":
            return 2;
    }

    return 0;
}
