import axios from "axios";
import { Song } from ".";
import { getContext } from "svelte";

type SongData = Song.SongData;

export async function loadAllSongs(fetch: ((input: string | URL | globalThis.Request,
    init?: RequestInit) => Promise<Response>)): Promise<SongData[]> {
    const recentUpdate = (Number(await (await fetch('/api/song/recent_update')).text())).toString();
    if (window.localStorage && window.localStorage.getItem('songs') !== null && window.localStorage.getItem('recentSongUpdateTime') === recentUpdate) {
        try {
            let result = JSON.parse(window.localStorage.getItem('songs') as string);
            if (Array.isArray(result)) {
                return result;
            }
        }
        catch { }
    }
    window.localStorage?.setItem('recentSongUpdateTime', recentUpdate);
    const songs = await (await fetch('/api/song')).json();
    window.localStorage?.setItem('songs', JSON.stringify(songs));
    return (songs);
}

export async function loadSongBySongNo(songNo: string): Promise<SongData | null> {
    const recentUpdate = ((await axios.get('/api/song/recent_update')).data as number).toString()
    if (window.localStorage && window.localStorage.getItem('songs') !== null && window.localStorage.getItem('recentSongUpdateTime') === recentUpdate) {
        return (JSON.parse(window.localStorage.getItem('songs') as string) as SongData[]).find(song => song.songNo === songNo) ?? null
    }
    else {
        const song = (await axios.get(`/api/song/${songNo}`)).data;
        if (Object.keys(song).length === 0 && song.constructor === Object) {
            return null;
        }
        return song;
    }
}

export function getSongsFromContext(): SongData[] {
    return getContext('songs') as SongData[];
}

export function getSongFromContextBySongNo(songNo: string): SongData | null {
    return (getContext('songs') as SongData[]).find(song => song.songNo === songNo) ?? null;
}