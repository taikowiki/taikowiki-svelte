import UserController from '$lib/module/common/user/user-controller.server.js';
import { GamecenterController } from '$lib/module/common/gamecenter/gamecenter.server.js';
import { error } from '@sveltejs/kit';

export async function load({params}){
    const report = await GamecenterController.getReportByOrder(Number(params.order));

    if(!report){
        throw error(404);
    }

    const nickname = await UserController.getNickname(report.UUID);

    return {
        report,
        nickname
    }
}