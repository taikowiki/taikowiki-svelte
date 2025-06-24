import { Notice } from '$lib/module/notice/index.js';
import '$lib/module/notice/notice.server.js';
import { error } from '@sveltejs/kit';

export async function load({params}){
    const order = Number(params.order);
    if(isNaN(order)){
        throw error(404);
    }

    const notice = await Notice.Server.DBController.getNoticeByOrder(order);
    if(!notice){
        throw error(404);
    }

    return {
        notice
    }
}