import SongDB from '$lib/module/common/song/song.server.js';
import type { SongData } from '$lib/module/common/song/types.js';
import { error, redirect } from '@sveltejs/kit';
import { runQuery } from '@sveltekit-board/db';

export async function POST({ request, locals }) {
    if (!locals.user || !locals.userBasicData || !locals.userData) throw error(403);

    const data = await request.json();
    const songData = data.songData as SongData;
    const songNo = data.songNo as string;
    if (!songData || !songNo) throw error(400);

    Object.values(songData.courses).forEach(course => {
        if (course === null) return;
        course.images = course.images.filter(e => e !== '');
    })

    if (await SongDB.getBySongNo(songNo as string)) { //새곡 아님
        await runQuery(async (run) => {
            await run(`INSERT INTO \`song/request\` (\`UUID\`, \`songNo\`, \`createdTime\`, \`type\`, \`data\`) VALUES (?, ?, ?, ?, ?)`, [locals.userData?.UUID, songNo, Date.now(), 'edit', JSON.stringify(songData)])
        })

        return new Response();
    }
    else {//새곡
        await runQuery(async (run) => {
            await run(`INSERT INTO \`song/request\` (\`UUID\`, \`songNo\`, \`createdTime\`, \`type\`, \`data\`) VALUES (?, ?, ?, ?, ?)`, [locals.userData?.UUID, songNo, Date.now(), 'new', JSON.stringify(songData)])
        })

        return new Response();
    }
}