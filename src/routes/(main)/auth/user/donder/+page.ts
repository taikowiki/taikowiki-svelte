import { fetchMeasures, getRating } from '@taiko-wiki/taiko-rating';

export async function load({ data }) {
    if (data.donderData && data.donderData.scoreData) {
        const scoreData = data.donderData.scoreData;
        const loadingPromise = (async() => {
            const measures = await fetchMeasures();
            const ratings = getRating(scoreData, measures);

            return {
                measures,
                ratings
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