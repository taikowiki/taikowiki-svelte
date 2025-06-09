import { userDBController } from '$lib/module/common/user/user.server';
import { Gamecenter } from "$lib/module/gamecenter";
import '$lib/module/gamecenter/gamecenter.server.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const report = await Gamecenter.Server.DBController.getReportByOrder(Number(params.order));

    if (!report) {
        throw error(404);
    }

    const nickname = await userDBController.getNickname(report.UUID);

    return {
        report,
        nickname
    }
}