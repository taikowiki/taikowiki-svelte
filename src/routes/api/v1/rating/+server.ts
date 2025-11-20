import { User } from '$lib/module/user/index.js';
import '$lib/module/user/user.server.js';
import { error } from '@sveltejs/kit';
import { runQuery } from '@yowza/db-handler';
import { Util } from '$lib/module/util/util.server';
import type { RequestEvent } from './$types';

const {queryBuilder} = Util.Server;

export async function GET({ url, request, setHeaders, locals }: RequestEvent) {
    const ratingdata = url.searchParams.get('ratingdata');

    const apiKey = request.headers.get('x-api-key');
    if (!apiKey) throw error(403);

    const UUID = await User.Server.apiKeyDBController.checkKey(apiKey);
    if (!UUID) throw error(403);

    if (ratingdata === 'top50' || ratingdata === 'all') {
        var query = queryBuilder
            .select('user/donder_data', () => ({
                donder: 'donder',
                currentRating: 'currentRating',
                ratingData: 'ratingData'
            }))
            .where(({ compare, column, value }) => [
                compare(column('UUID'), '=', value(UUID))
            ])
            .build();
    }
    else {
        var query = queryBuilder
            .select('user/donder_data', () => ({
                donder: 'donder',
                currentRating: 'currentRating'
            }))
            .where(({ compare, column, value }) => [
                compare(column('UUID'), '=', value(UUID))
            ])
            .build();
    }

    const data = await runQuery(async (run) => {
        return await run(query);
    }).then(result => {
        if (result?.[0]) {
            const data = result[0];
            data.donder = JSON.parse(data.donder);
            if ("ratingData" in data) {
                data.ratingData = JSON.parse(data.ratingData);
            }
            return data;
        }
        return null;
    });

    if (!data) throw error(404);

    if (ratingdata === 'top50' && "ratingData" in data) {
        data.ratingData = data.ratingData.slice(0, 50);
    }

    setHeaders({
        'Content-Type': 'application/json'
    })

    return new Response(JSON.stringify(data))
}