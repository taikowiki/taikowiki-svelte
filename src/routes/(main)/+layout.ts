import { browser } from "$app/environment";
import { loadAllSongs } from "$lib/module/common/song/song.client";

export async function load({data}){
    if(browser){
        return{
            songs: await loadAllSongs(),
            ...data
        }
    }
    return data;
}