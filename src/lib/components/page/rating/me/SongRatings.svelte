<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";
    import type { UserDonderData } from "$lib/module/common/user/types";
    import { getTheme } from "$lib/module/layout/theme";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import type { getRating } from "@taiko-wiki/taiko-rating";
    import SongRatingItem from "./SongRatingItem.svelte";
    import html2canvas from "html2canvas";

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

    let downloadReplica: HTMLDivElement;
    const download = async () => {
        (async () => {
            const canvas = await html2canvas(downloadReplica, {
                backgroundColor: "rgb(255, 255, 255)",
            });
            const url = canvas.toDataURL();
            const a = document.createElement("a");
            a.setAttribute("download", `test.png`);
            a.href = url;
            a.click();
            a.remove();
            canvas.remove();
        })();
        alert(newI18n.downloadMessage);
    };
</script>

<div class="center">
    <div class="song-container-title">
        <h3 class="song-top50">{newI18n.rating.top} 50{newI18n.song}</h3>
        <button style="cursor: pointer;display:flex;align-items:center;column-gap:5px;padding: 0;border: none;background: none;" onclick={() => download()}>
            <span data-theme={$theme}>{newI18n.download}</span>
        </button>
    </div>
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
                    isDownload={false}
                />
            {/if}
        {/each}
    </div>
    <div class="replica" data-theme={$theme} bind:this={downloadReplica}>
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
                isDownload={true}
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
                            isDownload={false}
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

    .song-container-title {
        width: 100%;
        margin-block: 0;
        display: flex;
        justify-content: space-between;
    }
    .song-container-title>button>span {
        width: auto;
        margin-block: 0;
        
        font-family: "Noto Sans KR", "Noto Sans JP";
        font-weight: 700;
        color: #cf4844;
    }
    .song-container-title>button>span[data-theme="dark"] {
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

        top: 0;
        left: calc(-100vw - 720px);

        transform: translateX(-100%);
    }
</style>
