import { getTier } from '$lib/module/common/user/getTier.js';
import type { UserDonderData } from '$lib/module/common/user/types.js';
import { userDonderRequestor } from '$lib/module/common/user/user.client.js';
import { error } from '@sveltejs/kit';
import { fetchMeasures, getRating } from '@taiko-wiki/taiko-rating';
import axios from 'axios';

export async function load({ data }) {
    if (data.donderData && data.donderData.scoreData) {
        const scoreData = data.donderData.scoreData;

        const loadingPromise = (async () => {
            const donderData = data.donderData as UserDonderData;

            const measureCommitData = await axios({
                method: 'get',
                url: "https://api.github.com/repos/taikowiki/taiko-fumen-measure-table/branches/main"
            })
            const measures = await fetchMeasures();

            if (!donderData.lastRatingCalculate || !donderData.currentRating || !donderData.currentExp || !donderData.ratingData || (donderData.lastRatingCalculate?.getTime() ?? 0) < new Date(measureCommitData?.data?.commit?.commit?.committer.date ?? 0).getTime()) {
                //레이팅 계산이 상수표 갱신 이전인 경우
                var ratings = getRating(scoreData, measures);

                var rankingResponse = await userDonderRequestor.updateRating({ rating: ratings.rating, exp: ratings.exp, ratingData: ratings.songRatingDatas });
                if (rankingResponse.status === "error") {
                    throw error(500);
                }
            }
            else {
                var ratings = {
                    rating: donderData.currentRating,
                    exp: donderData.currentExp,
                    songRatingDatas: donderData.ratingData
                }

                var rankingResponse = await userDonderRequestor.getRanking(null);
                if (rankingResponse.status === "error") {
                    throw error(500);
                }
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