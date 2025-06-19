import { songDBController } from "$lib/module/common/song/song.server.js";
import { Song } from "$lib/module/song/index.js";
import { User } from "$lib/module/user";
import '$lib/module/user/user.client';

export async function load({ locals: { userData } }) {
    const songDatas = (await songDBController.getAllColumns([
        "title",
        "songNo",
        "genre",
        "courses",
    ])) as Pick<Song.SongData, "songNo" | "title" | "genre" | "courses">[];

    const logined = !!userData;
    const donderData = logined
        ? await User.Server.donderDBController.getData(userData.UUID)
        : null;
    const ratingDataExists = !!donderData?.scoreData;
    const ranking = ratingDataExists
        ? await User.Server.donderDBController.getRankByRating(userData!.UUID)
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
