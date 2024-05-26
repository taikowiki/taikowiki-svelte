import SongDB from '$lib/module/common/song/song.server.js';
import type { SongData } from '$lib/module/common/song/types.js';
import { error, redirect } from '@sveltejs/kit';
import { runQuery } from '@sveltekit-board/db';

export async function POST({ request, locals }) {
    if (!locals.user || !locals.userBasicData || !locals.userData) throw error(403);

    const formData = (await request.formData());
    const data = formData.get('data');
    const songNo = formData.get('song_no')
    if (!data || !songNo) throw error(400);

    let songData;
    try {
        songData = JSON.parse(data as string) as SongData;
    }
    catch {
        throw error(400);
    }
    Object.values(songData.courses).forEach(course => {
        if(course === null) return;
        course.images = course.images.filter(e => e !== '');
    })

    if (await SongDB.getBySongNo(songNo as string)) { //새곡 아님
        await runQuery(async(run) => {
            await run(`INSERT INTO \`song/edit\` (\`UUID\`, \`songNo\`, \`createdTime\`, \`type\`, \`data\`) VALUES (?, ?, ?, ?, ?)`, [locals.userData?.UUID, songNo, Date.now(), 'edit', JSON.stringify(songData)])
        })
    }
    else {//새곡
        await runQuery(async(run) => {
            await run(`INSERT INTO \`song/edit\` (\`UUID\`, \`songNo\`, \`createdTime\`, \`type\`, \`data\`) VALUES (?, ?, ?, ?, ?)`, [locals.userData?.UUID, songNo, Date.now(), 'new', JSON.stringify(songData)])
        })
    }

    throw redirect(302, '/');
}