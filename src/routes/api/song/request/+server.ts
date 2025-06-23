import { Song } from '$lib/module/song/song.server';
import { error } from '@sveltejs/kit';
import { Util } from '$lib/module/util/util.server';

const {getClientAddress} = Util.Server;

export async function POST(event) {
    const { request, locals } = event;

    if (!locals.user || !locals.userData) throw error(403);
    if (locals.userData.grade < 2) throw error(401);

    const data = await request.json();
    const songData = data.songData as Song.SongData;
    const songNo = data.songNo as string;
    if (!songData || !songNo) throw error(400);

    Object.values(songData.courses).forEach(course => {
        if (course === null) return;
        course.images = course.images.filter(e => e !== '');
    })

    await Song.Server.reqDBController.createRequest({
        UUID: locals.userData.UUID,
        songNo,
        data: songData,
        ip: getClientAddress(event)
    })

    return new Response();
}