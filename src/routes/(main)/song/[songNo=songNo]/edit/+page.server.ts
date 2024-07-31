import { redirect } from '@sveltejs/kit';
import {songDBController} from '$lib/module/common/song/song.server.js';

export async function load({locals, params}){
    if(!locals.user){
        throw redirect(302, `/auth/login?redirect_to=${encodeURIComponent(`/song/${params.songNo}/edit`)}`)
    }

    return{
        song: await songDBController.getSongBySongNo(params.songNo)
    }
}