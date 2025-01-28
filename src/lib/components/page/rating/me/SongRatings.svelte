<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";
    import type { UserDonderData } from "$lib/module/common/user/types";
    import { getTheme } from "$lib/module/layout/theme";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import type { getRating } from "@taiko-wiki/taiko-rating";
    import SongRatingItem from "./SongRatingItem.svelte";
    import html2canvas from "html2canvas";
    import DonderData from "./DonderData.svelte";
    import DonderRating from "./DonderRating.svelte";
    import { page } from "$app/stores";

    interface Props {
        ratings: ReturnType<typeof getRating>;
        songDatas: Pick<SongData, "songNo" | "title">[];
        donderData: UserDonderData;
        only50?: boolean;
    }

    let { ratings, songDatas, donderData, only50 = false }: Props = $props();

    let subOpened = $state(false);

    const [theme] = getTheme();
    const lang = getLang();
    let i18n = $derived(getI18N("/auth/user/donder", $lang));
    let newI18n = $derived(getI18N($lang).page.donder);

    let downloadReplica: HTMLDivElement | null = $state(null);
    function download() {
        queueMicrotask(async () => {
            if (!downloadReplica) return;
            const canvas = await html2canvas(downloadReplica, {
                backgroundColor: "rgb(255, 255, 255)",
            });
            const url = canvas.toDataURL();
            const a = document.createElement("a");
            a.setAttribute("download", `rating.png`);
            a.href = url;
            a.click();
            a.remove();
            canvas.remove();
        });
        alert(newI18n.downloadMessage);
    }
</script>

{#snippet title()}
    <div class="song-container-title">
        <h3 class="song-top50">{newI18n.rating.top} 50{newI18n.song}</h3>
        <button
            style="cursor: pointer;display:flex;align-items:center;column-gap:5px;padding: 0;border: none;background: none;"
            onclick={() => download()}
        >
            <span data-theme={$theme}>{newI18n.download}</span>
        </button>
    </div>
{/snippet}
{#snippet ratingSongItemView(
    songRatingData: Props["ratings"]["songRatingDatas"][number],
    index: number,
    isDownload: boolean,
)}
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
            {isDownload}
        />
    {/if}
{/snippet}
{#snippet replica()}
    {#snippet replicaHead()}
        <div class="replica-head">
            <DonderData donderData={$page.data.donderData} isDownload={true} />
            <DonderRating
                ratings={$page.data.ratings}
                tier={$page.data.tier}
                ranking={$page.data.ranking}
                isDownload={true}
            />
        </div>
    {/snippet}
    <div class="replica" data-theme="light" bind:this={downloadReplica}>
        {@render replicaHead()}
        {#each ratings.songRatingDatas.slice(0, Math.min(50, ratings.songRatingDatas.length)) as songRatingData, index}
            {@render ratingSongItemView(songRatingData, index, true)}
        {/each}
    </div>
{/snippet}
{#snippet notOnly50()}
    {#snippet otherTitle()}
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
    {/snippet}
    {#if !only50}
        {@render otherTitle()}
        {#if subOpened}
            <div class="song-container" data-theme={$theme}>
                {#each ratings.songRatingDatas.slice(Math.min(50, ratings.songRatingDatas.length), ratings.songRatingDatas.length) as songRatingData, index}
                    {@render ratingSongItemView(songRatingData, index, false)}
                {/each}
            </div>
        {/if}
    {/if}
{/snippet}

<div class="center">
    {@render title()}
    <div class="song-container" data-theme={$theme}>
        {#each ratings.songRatingDatas.slice(0, Math.min(50, ratings.songRatingDatas.length)) as songRatingData, index}
            {@render ratingSongItemView(songRatingData, index, false)}
        {/each}
    </div>
    {@render replica()}
    {@render notOnly50()}
</div>

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

    .replica {
        width: 720px;
        position: absolute;

        left: -100vw;
        top: -100vh;

        transform: translate(-100%, -100%);
    }
    .replica-head {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        color: black;
        margin-bottom: 15px;
    }
</style>
