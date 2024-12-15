import { songDBController } from '$lib/module/common/song/song.server';
import type { Difficulty } from '$lib/module/common/song/types.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params, url }) {
    const song = await songDBController.getSongBySongNo(params.songNo)
    const diff = (url.searchParams.get('diff') ?? 'oni') as Difficulty;

    if (song && !song?.courses?.[diff]) {
        redirect(303, `/song/${params.songNo}?diff=oni`)
    }

    return {
        song
    }
}