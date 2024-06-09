import { browser } from '$app/environment';
import { loadAllSongs } from '$lib/module/common/song/song.client.js';
import type { SongData } from '$lib/module/common/song/types.js';

export async function load({data, fetch}){
    let songs:SongData[] = [];
    if(browser){
        songs = await loadAllSongs(fetch);
    }
    
    return {
        ...data,
        songs
    }
}