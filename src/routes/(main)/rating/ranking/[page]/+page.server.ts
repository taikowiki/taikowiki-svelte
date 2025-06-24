import { User } from "$lib/module/user";
import '$lib/module/user/user.server';
import { error } from "@sveltejs/kit";

export async function load({ params, locals }) {
    const page = Number(params.page);
    if (isNaN(page)) {
        throw error(404);
    }

    const [rankings, count] = await Promise.all([
        User.Server.donderDBController.getRanking(page),
        User.Server.donderDBController.count(),
    ]);

    const refinedRankings = rankings.map((e) => {
        const data = {
            UUID: e.UUID,
            currentRating: e.currentRating,
            donder: {
                nickname: e.donder.nickname,
                taikoNumber: e.donder.taikoNumber,
            } as { nickname: string | null; taikoNumber: string | null },
            tier: User.getTier(e.currentRating),
        };

        if (!locals.userData || locals.userData.grade < 10) {
            if (!e.showRatingNickname) {
                data.donder.nickname = null;
            }
            if (!e.showRatingTaikoNo) {
                data.donder.taikoNumber = null;
            }
        }

        return data;
    });

    return {
        rankings: refinedRankings,
        count,
    };
}
