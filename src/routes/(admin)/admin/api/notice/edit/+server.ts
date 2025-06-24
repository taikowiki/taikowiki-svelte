import { Notice } from '$lib/module/notice/index.js';
import '$lib/module/notice/notice.server.js';
import { error } from '@sveltejs/kit';

export async function POST({request}){
    const data = await request.json();
    if(typeof(data.order) !== "number"){
        throw error(400);
    }

    if(data.notice?.officialDate){
        data.notice.officialDate = new Date(data.notice.officialDate);
    }
    const checking = {
        ...data.notice,
        order: 0,
        writtenDate: new Date()
    }
    if(!Notice.Schema.Notice.safeParse(checking)) throw error(400, JSON.stringify({
        reason: 'Type Error'
    }));

    const order = data.order;
    const notice: Notice.Notice = data.notice;
    if(!notice.title || !notice.content) throw error(400, JSON.stringify({
        reason: 'Empty Title or Content'
    }))

    if(notice.type === "official" && !notice.officialDate)throw error(400, JSON.stringify({
        reason: 'Empty Official Date'
    }))

    const result = await Notice.Server.DBController.editNotice(order, notice);
    if(!result){
        throw error(500);
    }

    return new Response();
}