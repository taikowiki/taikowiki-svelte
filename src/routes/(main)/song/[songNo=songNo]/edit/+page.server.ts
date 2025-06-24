import { error, redirect } from '@sveltejs/kit';
import { Song } from '$lib/module/song/song.server';

export async function load({locals, params}){
    if(!locals.user){
        throw redirect(302, `/auth/login?redirect_to=${encodeURIComponent(`/song/${params.songNo}/edit`)}`)
    }

    const song = await Song.Server.DBController.getSongBySongNo(params.songNo);
    if(!song){
        throw error(404);
    }

    return{
        song
    }
}