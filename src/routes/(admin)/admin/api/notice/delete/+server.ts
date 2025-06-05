import { NoticeServer } from '$lib/module/notice/notice.server.js';
import { error } from '@sveltejs/kit';

export async function DELETE({request}){
    const data = await request.json();
    if(typeof(data?.order) !== "number"){
        throw error(400);
    }

    await NoticeServer.DBController.deleteNotice(data.order);

    return new Response();
}