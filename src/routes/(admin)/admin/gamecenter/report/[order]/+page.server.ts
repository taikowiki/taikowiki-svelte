import { User } from "$lib/module/user";
import '$lib/module/user/user.client';
import { Gamecenter } from "$lib/module/gamecenter";
import '$lib/module/gamecenter/gamecenter.server.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const report = await Gamecenter.Server.DBController.getReportByOrder(Number(params.order));

    if (!report) {
        throw error(404);
    }

    const nickname = await User.Server.DBController.getNickname(report.UUID);

    return {
        report,
        nickname
    }
}