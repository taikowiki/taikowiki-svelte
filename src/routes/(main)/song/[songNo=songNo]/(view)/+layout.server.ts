import { error, redirect } from '@sveltejs/kit';
import { Song } from '$lib/module/song/song.server';
import type { RequestEvent } from './$types';

export async function load({ locals, params }: RequestEvent) {
    const song = await Song.Server.DBController.getSongBySongNo(params.songNo);
    if (!song) {
        throw error(404);
    }

    return {
        song
    }
}