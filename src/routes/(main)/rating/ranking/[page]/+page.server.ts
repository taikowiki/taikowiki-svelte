import { getTier } from "$lib/module/common/user/getTier.js";
import { userDonderDBController } from "$lib/module/common/user/user.server";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const page = Number(params.page);
    if (isNaN(page)) {
        throw error(404);
    }

    const [rankings, count] = await Promise.all([
        userDonderDBController.getRanking(page),
        userDonderDBController.count(),
    ]);

    const refinedRankings = rankings.map((e) => {
        const data = {
            UUID: e.UUID,
            currentRating: e.currentRating,
            donder: {
                nickname: e.donder.nickname,
                taikoNumber: e.donder.taikoNumber,
            } as { nickname: string | null; taikoNumber: string | null },
            tier: getTier(e.currentRating),
        };

        if (!e.showRatingNickname) {
            data.donder.nickname = null;
        }
        if (!e.showRatingTaikoNo) {
            data.donder.taikoNumber = null;
        }

        return data;
    });

    return {
        rankings: refinedRankings,
        count,
    };
}
