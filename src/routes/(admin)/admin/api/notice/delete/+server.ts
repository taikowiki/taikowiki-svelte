import { Notice } from '$lib/module/notice/index.js';
import '$lib/module/notice/notice.server.js';
import { error } from '@sveltejs/kit';

export async function DELETE({request}){
    const data = await request.json();
    if(typeof(data?.order) !== "number"){
        throw error(400);
    }

    await Notice.Server.DBController.deleteNotice(data.order);

    return new Response();
}