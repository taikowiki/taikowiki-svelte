import Song from "$lib/module/common/song";

export async function load(){
    return {
        songs: await Song.getAll()
    }
}