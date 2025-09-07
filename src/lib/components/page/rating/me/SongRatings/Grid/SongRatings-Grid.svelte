<script lang="ts">
    import { Song } from "$lib/module/song";
    import { User } from "$lib/module/user";
    import { getTheme } from "$lib/module/layout/theme";
    import { getI18N, getLang } from "$lib/module/i18n";
    import type { getRating } from "@taiko-wiki/taiko-rating";
    import SongRatingItem from "./SongRatings-GridItem.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    interface Props {
        songRatingDatas: ReturnType<typeof getRating>['songRatingDatas'];
        songDatas: Pick<Song.SongData, "songNo" | "title">[];
        scoreData: User.DonderData['scoreData'];
        only50: boolean;
        downloadImage: () => void;
        forDownload?: boolean;
    }

    let {
        songRatingDatas,
        songDatas,
        scoreData,
        only50,
        downloadImage,
        forDownload = false,
    }: Props = $props();

    let subOpened = $state(false);

    const [theme] = getTheme();
    const lang = getLang();
    let newI18n = $derived(getI18N($lang).page.donder);
    const isMobileStore = getIsMobile();
    let isMobile = $derived(forDownload ? false : $isMobileStore);
</script>

<div class="center">
    {@render title()}
    <div class="song-container" data-isMobile={isMobile}>
        {#each songRatingDatas.slice(0, Math.min(50, songRatingDatas.length)) as songRatingData, index}
            {@render ratingSongItemView(songRatingData, index, forDownload)}
        {/each}
    </div>
    {@render notOnly50()}
</div>

{#snippet title()}
    <div class="song-container-title">
        <h3 class="song-top50">{newI18n.rating.top} 50{newI18n.song}</h3>
        {#if forDownload !== true}
            <button
                style="cursor: pointer;display:flex;align-items:center;column-gap:5px;padding: 0;border: none;background: none;"
                onclick={() => downloadImage()}
            >
                <span data-theme={$theme}>{newI18n.download}</span>
            </button>
        {/if}
    </div>
{/snippet}
{#snippet ratingSongItemView(
    songRatingData: Props["songRatingDatas"][number],
    index: number,
    forDownload: boolean,
    isTop50: boolean = true,
)}
    {@const songData = songDatas.find(
        ({ songNo }) => songNo === songRatingData.songNo.toString(),
    )}
    {@const songDifficultyScoreData =
        scoreData?.[songRatingData.songNo]?.difficulty?.[
            songRatingData.difficulty
        ]}
    {#if songData && songDifficultyScoreData}
        <SongRatingItem
            {songRatingData}
            {songData}
            {songDifficultyScoreData}
            {isTop50}
            order={index + 1}
            {forDownload}
        />
    {/if}
{/snippet}
{#snippet notOnly50()}
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
            <div class="song-container" data-isMobile={isMobile}>
                {#each songRatingDatas.slice(Math.min(50, songRatingDatas.length), songRatingDatas.length) as songRatingData, index}
                    {@render ratingSongItemView(
                        songRatingData,
                        index + 50,
                        forDownload,
                        false,
                    )}
                {/each}
            </div>
        {/if}
    {/if}
{/snippet}

<style>
    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 100%;
    }

    .song-container-title {
        width: 100%;
        margin-block: 0;
        display: flex;
        justify-content: space-between;
    }
    .song-container-title > button > span {
        width: auto;
        margin-block: 0;

        font-family: "Noto Sans KR", "Noto Sans JP";
        font-weight: 700;
        color: #cf4844;
    }
    .song-container-title > button > span[data-theme="dark"] {
        color: white;
    }

    h3.song-top50 {
        width: 50%;
        margin-block: 0;
    }
    h3.other {
        width: 100%;
        margin-block: 0;
    }

    .song-container {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, 200px);
        gap: 10px;
        justify-content: center;

        padding-block: 10px;

        &[data-isMobile="true"] {
            display: flex;
            flex-direction: column;
        }
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
