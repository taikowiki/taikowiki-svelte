import { User } from '$lib/module/user/index.js';
import '$lib/module/user/user.server.js';
import { error } from '@sveltejs/kit';
import { Util } from '$lib/module/util/util.server';
import type { RequestEvent } from './$types';

export async function GET({ url, request, setHeaders }: RequestEvent) {
    const ratingdata = url.searchParams.get('ratingdata');

    const apiKey = request.headers.get('x-api-key');
    if (!apiKey) throw error(403);

    const UUID = await User.Server.apiKeyDBController.checkKey(apiKey);
    if (!UUID) throw error(403);

    const profileResponse = await Util.Server.dbMaster.func.simpleProfile(UUID);
    if (profileResponse.status === "error") {
        console.error(profileResponse)
        throw error(500);
    }
    const profile = profileResponse.data[0];
    if (!profile) {
        throw error(204);
    }
    profile.mydon = `https://img.taiko-p.jp/imgsrc.php?v=&kind=mydon&fn=mydon_${profile.taikoNumber}`;
    const currentRating = profile.currentRatingScore;
    delete profile?.UUID;
    delete profile?.currentRatingScore;
    delete profile?.lastUpload;

    const data = {
        donder: profile,
        currentRating,
    } as any;

    if (ratingdata === "top50") {
        const songRatingDatasResponse = await Util.Server.dbMaster.func.songRatingDatas(UUID, false);
        if (songRatingDatasResponse.status === "error") {
            throw error(500);
        }
        data.songRatingDatas = songRatingDatasResponse.data.map((e) => {
            delete e?.UUID;
            delete e?.lastUpload;
            return e;
        });
    }
    else if (ratingdata === "all") {
        const songRatingDatasResponse = await Util.Server.dbMaster.func.songRatingDatas(UUID, true);
        if (songRatingDatasResponse.status === "error") {
            throw error(500);
        }
        data.songRatingDatas = songRatingDatasResponse.data.toSorted((a, b) => b.ratingScore - a.ratingScore).map((e) => {
            delete e?.UUID;
            delete e?.lastUpload;
            return e;
        });
    }

    setHeaders({
        'Content-Type': 'application/json'
    })

    return new Response(JSON.stringify(data))
}