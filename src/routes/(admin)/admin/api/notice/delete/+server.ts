import { noticeDBController } from '$lib/module/common/notice/notice.server.js';
import { error } from '@sveltejs/kit';

export async function DELETE({request}){
    const data = await request.json();
    if(typeof(data?.order) !== "number"){
        throw error(400);
    }

    await noticeDBController.deleteNotice(data.order);

    return new Response();
}