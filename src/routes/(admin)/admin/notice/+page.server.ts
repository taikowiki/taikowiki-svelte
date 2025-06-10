import { Notice } from '$lib/module/notice/index.js';
import '$lib/module/notice/notice.server.js';

export async function load(){
    return {
        notices: await Notice.Server.DBController.getNoticeList()
    }
}