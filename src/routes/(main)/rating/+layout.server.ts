import { songDBController } from "$lib/module/common/song/song.server.js";
import type { SongData } from "$lib/module/common/song/types.js";
import { userDonderDBController } from "$lib/module/common/user/user.server";

export async function load({ locals: { userData } }) {
    const songDatas = (await songDBController.getAllColumns([
        "title",
        "songNo",
        "genre",
        "courses",
    ])) as Pick<SongData, "songNo" | "title" | "genre" | "courses">[];

    const logined = !!userData;
    const donderData = logined
        ? await userDonderDBController.getData(userData.UUID)
        : null;
    const ratingDataExists = !!donderData?.scoreData;
    const ranking = ratingDataExists
        ? await userDonderDBController.getRankByRating(userData!.UUID)
        : null;

    return {
        ratingDataExists,
        donderData,
        songDatas,
        ranking,
        logined,
    };
}

export const ssr = false;
