import { Song } from '$lib/module/song/index.js';
import { User } from '$lib/module/user';
import '$lib/module/user/user.client';
import { error } from '@sveltejs/kit';
import { fetchMeasures, getRating } from '@taiko-wiki/taiko-rating';
import axios from 'axios';

export async function load(event) {
    const data = event.data as LayoutData;
    const measures = await fetchMeasures();

    if (data.ratingDataExists) {
        const scoreData = data.donderData.scoreData;
        const donderData = data.donderData as User.DonderData;

        const measureCommitData = await axios({
            method: 'get',
            url: "https://api.github.com/repos/taikowiki/taiko-fumen-measure-table/branches/main"
        })

        if (!donderData.lastRatingCalculate || !donderData.currentRating || !donderData.currentExp || !donderData.ratingData || (donderData.lastRatingCalculate?.getTime() ?? 0) < new Date(measureCommitData?.data?.commit?.commit?.committer.date ?? 0).getTime()) {
            //레이팅 계산이 상수표 갱신 이전인 경우
            var ratings = getRating(scoreData, measures);

            const rankingResponse = await User.Client.donderRequest.updateRating({ rating: ratings.rating, exp: ratings.exp, ratingData: ratings.songRatingDatas });
            if (rankingResponse.status === "error") {
                throw error(500);
            }
            var ranking = rankingResponse.data;
        }
        else {
            var ratings = {
                rating: donderData.currentRating,
                exp: donderData.currentExp,
                songRatingDatas: donderData.ratingData
            }

            var ranking = data.ranking;
        }

        const tier = User.getTier(ratings.rating);

        return {
            ...data,
            ranking,
            measures,
            ratings,
            tier
        }
    }
    else {
        return {
            ...data,
            measures
        }
    }
}

type LayoutData = ({
    ratingDataExists: true,
    donderData: User.DonderData & {scoreData: User.ScoreData},
    songDatas: Pick<Song.SongData, 'songNo' | 'title' | 'genre' | 'courses'>[],
    ranking: { count: number, ranking: number }
} | {
    ratingDataExists: false,
    donderData: null,
    songDatas: Pick<Song.SongData, 'songNo' | 'title' | 'genre' | 'courses'>[],
    ranking: null
}) & {logined: boolean}