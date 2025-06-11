<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";
    import { User } from "$lib/module/user";
    import { getTheme } from "$lib/module/layout/theme";
    import { getI18N, getLang } from "$lib/module/i18n";
    import type { getRating } from "@taiko-wiki/taiko-rating";
    import SongRatingItem from "../me/SongRatingItem.svelte";

    interface Props {
        songDatas: Pick<SongData, "songNo" | "title">[];
        scoreData: User.ScoreData;
        ratingData: ReturnType<typeof getRating>["songRatingDatas"];
    }

    let { songDatas, scoreData, ratingData }: Props = $props();

    const [theme] = getTheme();
    const lang = getLang();
    let newI18n = $derived(getI18N($lang).page.donder);
</script>

<div class="center">
    <h3>{newI18n.rating.top} 50{newI18n.song}</h3>
    <div class="song-container" data-theme={$theme}>
        {#each ratingData.slice(0, Math.min(50, ratingData.length)) as songRatingData, index}
            {@const songData = songDatas.find(
                ({ songNo }) => songNo === songRatingData.songNo.toString(),
            )}
            {@const songDifficultyScoreData =
                scoreData[songRatingData.songNo]?.difficulty?.[
                    songRatingData.difficulty
                ]}
            {#if songData && songDifficultyScoreData}
                <SongRatingItem
                    {songRatingData}
                    {songData}
                    {songDifficultyScoreData}
                    isTop50={true}
                    order={index + 1}
                    isDownload={false}
                />
            {/if}
        {/each}
    </div>
</div>

<style>
    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 100%;
    }

    h3 {
        width: 100%;
        margin-block: 0;
    }
    .song-container {
        width: 100%;
    }
</style>
