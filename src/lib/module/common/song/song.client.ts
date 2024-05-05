import axios from "axios";
import { type SongData } from "./types";

export async function loadAllSongs(): Promise<SongData[]> {
    const recentUpdate = ((await axios.get('/api/song/recent_update')).data as number).toString()
    if (window.localStorage && window.localStorage.getItem('songs') !== null && window.localStorage.getItem('recentSongUpdateTime') === recentUpdate) {
        try {
            let result = JSON.parse(window.localStorage.getItem('songs') as string);
            if(Array.isArray(result)){
                return result;
            }
        }
        catch{}
    }
    window.localStorage?.setItem('recentSongUpdateTime', recentUpdate);
    const songs = (await axios.get('/api/song')).data;
    window.localStorage?.setItem('songs', JSON.stringify(songs));
    return (songs);
}

export async function loadSongBySongNo(songNo: number): Promise<SongData | null> {
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