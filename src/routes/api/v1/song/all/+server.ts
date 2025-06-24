import { Song } from '$lib/module/song/song.server';
import { Util } from '$lib/module/util/index.js';

export async function GET({ url, setHeaders, locals }) {
    let after: number | null = Util.pipe(url.searchParams.get('after'), [
        (after: any) => Number(after),
        (after: number) => Number.isNaN(after) ? null : after
    ]);

    setHeaders({
        ...locals.headers,
        'Content-Type': 'application/json'
    })

    if (after) {
        return new Response(JSON.stringify(await Song.Server.DBController.getAfter(after)))
    }
    else {
        return new Response(JSON.stringify(await Song.Server.DBController.getAll()))
    }
}