import { noticeDBController } from '$lib/module/common/notice/notice.server.js';
import { error } from '@sveltejs/kit';

export async function load({params}){
    const order = Number(params.order);
    if(isNaN(order)){
        throw error(404);
    }

    const notice = await noticeDBController.getNoticeByOrder(order);
    if(!notice){
        throw error(404);
    }

    return {
        notice
    }
}