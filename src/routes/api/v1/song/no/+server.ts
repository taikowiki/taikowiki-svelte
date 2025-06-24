import { Song } from '$lib/module/song/song.server.js';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

export async function GET({url}){
    const json = url.searchParams.get('songno');

    if(!json){
        throw error(400);
    }
    
    try{
        var songNos = JSON.parse(json);
        z.array(z.string()).parse(songNos);
    }
    catch{
        throw error(400);
    }

    const songDatas = await Song.Server.DBController.getSongsBySongNo(songNos);

    return new Response(JSON.stringify(songDatas), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}