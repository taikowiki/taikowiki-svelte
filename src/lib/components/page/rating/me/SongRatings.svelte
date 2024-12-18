<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";
    import type { UserDonderData } from "$lib/module/common/user/types";
    import { getTheme } from "$lib/module/layout/theme";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import type { getRating } from "@taiko-wiki/taiko-rating";
    import SongRatingItem from "./SongRatingItem.svelte";

    interface Props {
        ratings: ReturnType<typeof getRating>;
        songDatas: Pick<SongData, "songNo" | "title">[];
        donderData: UserDonderData;
        only50?: boolean;
    }

    let {ratings, songDatas, donderData, only50 = false}: Props = $props();

    let subOpened = $state(false);

    const [theme] = getTheme();
    const lang = getLang();
    let i18n = $derived(getI18N("/auth/user/donder", $lang));
    let newI18n = $derived(getI18N($lang).page.donder);
</script>

<div class="center">
    <h3>{newI18n.rating.top} 50{newI18n.song}</h3>
    <div class="song-container" data-theme={$theme}>
        {#each ratings.songRatingDatas.slice(0, Math.min(50, ratings.songRatingDatas.length)) as songRatingData, index}
            {@const songData = songDatas.find(
                ({ songNo }) => songNo === songRatingData.songNo.toString(),
            )}
            {@const songDifficultyScoreData =
                donderData.scoreData?.[songRatingData.songNo]?.difficulty?.[
                    songRatingData.difficulty
                ]}
            {#if songData && songDifficultyScoreData}
                <SongRatingItem
                    {songRatingData}
                    {songData}
                    {songDifficultyScoreData}
                    isTop50={true}
                    order={index + 1}
                />
            {/if}
        {/each}
    </div>
    {#if !only50}
        <h3
            class="other"
            class:subOpened
            role="presentation"
            onclick={() => {
                subOpened = !subOpened;
            }}
        >
            {newI18n.otherSong}
        </h3>
        {#if subOpened}
            <div class="song-container" data-theme={$theme}>
                {#each ratings.songRatingDatas.slice(Math.min(50, ratings.songRatingDatas.length), ratings.songRatingDatas.length) as songRatingData, index}
                    {@const songData = songDatas.find(
                        ({ songNo }) =>
                            songNo === songRatingData.songNo.toString(),
                    )}
                    {@const songDifficultyScoreData =
                        donderData.scoreData?.[songRatingData.songNo]
                            ?.difficulty?.[songRatingData.difficulty]}
                    {#if songData && songDifficultyScoreData}
                        <SongRatingItem
                            {songRatingData}
                            {songData}
                            {songDifficultyScoreData}
                            isTop50={false}
                            order={index + 51}
                        />
                    {/if}
                {/each}
            </div>
        {/if}
    {/if}
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

    .other {
        cursor: pointer;

        display: flex;
        justify-content: flex-start;
    }
    .other::before {
        content: "▼";
    }
    .other.subOpened::before {
        content: "▲";
    }
</style>
