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
        songData = JSON.parse(data as string);
    }
    catch {
        throw error(400);
    }

    if (await SongDB.getBySongNo(songNo as string)) { //새곡 아님
        await runQuery(async(run) => {
            await run(`INSERT INTO \`song/edit\` (\`UUID\`, \`songNo\`, \`createdTime\`, \`type\`, \`data\`) VALUES (?, ?, ?, ?, ?)`, [locals.userData?.UUID, songNo, Date.now(), 'edit', data])
        })
    }
    else {//새곡
        await runQuery(async(run) => {
            await run(`INSERT INTO \`song/edit\` (\`UUID\`, \`songNo\`, \`createdTime\`, \`type\`, \`data\`) VALUES (?, ?, ?, ?, ?)`, [locals.userData?.UUID, songNo, Date.now(), 'new', data])
        })
    }

    throw redirect(302, '/');
}