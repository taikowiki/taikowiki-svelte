import {userDBController} from '$lib/module/common/user/user.server';
import { gamecenterDBController } from '$lib/module/common/gamecenter/gamecenter.server';
import { error } from '@sveltejs/kit';

export async function load({params}){
    const report = await gamecenterDBController.getReportByOrder(Number(params.order));

    if(!report){
        throw error(404);
    }

    const nickname = await userDBController.getNickname(report.UUID);

    return {
        report,
        nickname
    }
}