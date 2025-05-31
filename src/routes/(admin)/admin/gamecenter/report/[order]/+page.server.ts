import { userDBController } from '$lib/module/common/user/user.server';
import { GamecenterServer } from '$lib/module/gamecenter/gamecenter.server.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const report = await GamecenterServer.DBController.getReportByOrder(Number(params.order));

    if (!report) {
        throw error(404);
    }

    const nickname = await userDBController.getNickname(report.UUID);

    return {
        report,
        nickname
    }
}