import { getTier } from '$lib/module/common/user/getTier.js';
import { userDonderRequestor } from '$lib/module/common/user/user.client.js';
import { error } from '@sveltejs/kit';
import { fetchMeasures, getRating } from '@taiko-wiki/taiko-rating';

export async function load({ data }) {
    if (data.donderData && data.donderData.scoreData) {
        const scoreData = data.donderData.scoreData;
        const loadingPromise = (async() => {
            const measures = await fetchMeasures();
            const ratings = getRating(scoreData, measures);

            const rankingResponse = await userDonderRequestor.updateRating({rating: ratings.rating});

            if(rankingResponse.status === 'error'){
                throw error(500);
            }

            const rankingData = rankingResponse.data;

            const tier = getTier(ratings.rating);

            return {
                measures,
                ratings,
                rankingData,
                tier
            }
        })();

        return {
            loadingPromise,
            ...data
        }
    }
    else {
        return data;
    }
}