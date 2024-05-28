import SongDB from "$lib/module/common/song/song.server";

export async function load({ fetch }) {
    const user = JSON.parse(await (await fetch('/api/user')).text());
    return {
        newSongs: await SongDB.getNewSongs(),
        songs: await SongDB.getAll(),
        user
    }
}