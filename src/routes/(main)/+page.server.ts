export async function load({parent}){
    const parentData = await parent()
    const newSongs = parentData.newSongs;

    return {
        newSongs
    }
}