import SongDB from "$lib/module/common/song/song.server";

export async function GET({ url }) {
    let after: string | number | null = url.searchParams.get('after');

    if (after !== null) {
        after = Number(after);
        if (isNaN(after)) after = null;
    }

    if (after) {
        return new Response(JSON.stringify(await SongDB.getAfter(after as number)), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    else {
        return new Response(JSON.stringify(await SongDB.getAll()), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}