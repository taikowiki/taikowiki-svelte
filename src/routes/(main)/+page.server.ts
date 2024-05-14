export async function load({parent}){
    const newSongs = (await parent()).newSongs;

    return {
        newSongs
    }
}