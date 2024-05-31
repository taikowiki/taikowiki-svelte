import { browser } from '$app/environment';
import type { SongData } from '$lib/module/common/song/types.js';
import { redirect } from '@sveltejs/kit';

export async function load({params, parent}){
    if(browser){
        if(((await parent()).songs as SongData[]).find(song => song.songNo === params.songNo) === undefined){
            throw redirect(302, `/song/add?song_no=${params.songNo}`)
        }
    }
}