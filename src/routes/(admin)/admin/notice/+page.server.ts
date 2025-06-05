import { NoticeServer } from '$lib/module/notice/notice.server.js';

export async function load(){
    return {
        notices: await NoticeServer.DBController.getNoticeList()
    }
}