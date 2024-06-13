import SongDB from '$lib/module/common/song/song.server.js';

export async function load({params}){
    return{
        song: await SongDB.getBySongNo(params.songNo)
    }
}