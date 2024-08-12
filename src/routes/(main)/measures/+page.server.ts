import { songDBController } from "$lib/module/common/song/song.server";
import type { Course, SongData } from "$lib/module/common/song/types";

export async function load() {
    const songDatas = await songDBController.getAllColumns(["title", "songNo", "genre", 'courses']) as (Pick<SongData, 'title' | 'songNo' | 'genre'> & {courses: {oni: Course; ura: Course | null;}})[];

    songDatas.forEach(songData => {
        songData.courses = {
            oni: songData.courses.oni,
            ura: songData.courses.ura
        }
    })

    return {
        songDatas
    }
}