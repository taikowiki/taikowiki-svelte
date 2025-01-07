import { songRequestDBController } from '$lib/module/common/song/song.server.js';
import type { SongData } from '$lib/module/common/song/types.js';
import { getClientAddress } from '$lib/module/common/util.server.js';
import { error } from '@sveltejs/kit';

export async function POST(event) {
    const { request, locals } = event;

    if (!locals.user || !locals.userData) throw error(403);
    if (locals.userData.grade < 2) throw error(401);

    const data = await request.json();
    const songData = data.songData as SongData;
    const songNo = data.songNo as string;
    if (!songData || !songNo) throw error(400);

    Object.values(songData.courses).forEach(course => {
        if (course === null) return;
        course.images = course.images.filter(e => e !== '');
    })

    await songRequestDBController.createRequest({
        UUID: locals.userData.UUID,
        songNo,
        data: songData,
        ip: getClientAddress(event)
    })

    return new Response();
}