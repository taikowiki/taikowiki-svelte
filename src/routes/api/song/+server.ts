import { Song } from '$lib/module/song/song.server';

export async function GET({ url }) {
    let after: string | number | null = url.searchParams.get('after');

    if (after !== null) {
        after = Number(after);
        if (isNaN(after)) after = null;
    }

    if (after) {
        return new Response(JSON.stringify(await Song.Server.DBController.getAfter(after as number)), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    else {
        return new Response(JSON.stringify(await Song.Server.DBController.getAll()), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}