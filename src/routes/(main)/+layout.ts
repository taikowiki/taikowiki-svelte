import { browser } from "$app/environment";
import axios from "axios";

export async function load({ data }) {
    if (browser) {
        const songs = (await axios.get('/api/song')).data;
        window.localStorage?.setItem('songs', JSON.stringify(songs));
        return {
            songs,
            ...data
        }
    }
    return data;
}