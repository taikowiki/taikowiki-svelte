<script lang="ts">
    import type { getRating } from "@taiko-wiki/taiko-rating";
    import type {
        Crown,
        DifficultyScoreData,
        ScoreData,
    } from "node-hiroba/types";
    import color from "$lib/module/common/color";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import type { Difficulty, SongData } from "$lib/module/common/song/types";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";

    interface Props {
        songRatingData: ReturnType<typeof getRating>["songRatingDatas"][number];
        songDifficultyScoreData: DifficultyScoreData;
        songData: Pick<SongData, "songNo" | "title">;
        isTop50: boolean;
        order: number;
        isDownload?: boolean;
    }

    let {
        songRatingData,
        songDifficultyScoreData,
        songData,
        isTop50,
        order,
        isDownload = false,
    }: Props = $props();

    let opened = $state(false);
    function toggle() {
        opened = !opened;
    }

    const isMobile = getIsMobile();
    const [theme] = getTheme();
    const lang = getLang();
    let i18n = $derived(getI18N("/auth/user/donder", $lang));
    let newI18n = $derived(getI18N($lang).page.donder);

    function getDiffNum(diff: "oni" | "ura") {
        if (diff === "oni") {
            return 4;
        } else {
            return 5;
        }
    }

    function getCrownImage(crown: Crown) {
        if (isDownload) {
            return `/api/hirobaimg/crown/${crown}`;
        } else {
            switch (crown) {
                case "played": {
                    return "https://donderhiroba.jp/image/sp/640/crown_large_0_640.png";
                }
                case "silver": {
                    return "https://donderhiroba.jp/image/sp/640/crown_large_1_640.png";
                }
                case "gold": {
                    return "https://donderhiroba.jp/image/sp/640/crown_large_2_640.png";
                }
                case "donderfull": {
                    return "https://donderhiroba.jp/image/sp/640/crown_large_3_640.png";
                }
            }
        }
    }
</script>

<div
    class="song"
    class:top50={isTop50}
    data-theme={isDownload ? "light" : $theme}
>
    <div class="order" data-isDownload={isDownload}>
        {order}
    </div>
    <div class="detail">
        <div class="detail-content">
            <div class="detail-head">
                <div
                    class="detail-preview"
                    data-isMobile={isDownload ? false : $isMobile}
                >
                    <div class="detail-layer1">
                        <a
                            class="song-title"
                            style={`color:${color.difficulty[songRatingData.difficulty]};`}
                            href={`/song/${songRatingData.songNo}?diff=${songRatingData.difficulty}`}
                        >
                            {songData.title}
                        </a>
                    </div>
                    <div class="detail-layer2">
                        <div class="crown-wrapper" title={i18n.crown}>
                            <img
                                class="crown"
                                src={getCrownImage(
                                    songDifficultyScoreData.crown,
                                )}
                                alt={`${songDifficultyScoreData.crown} crown`}
                            />
                        </div>
                        <div
                            class="accuracy"
                            title={i18n.accuracy}
                            data-isDownload={isDownload}
                        >
                            {songRatingData.songRating.accuracy.toFixed(2)}%
                        </div>
                        <div
                            class="measure"
                            title={i18n.measureValue}
                            data-isDownload={isDownload}
                        >
                            {songRatingData.songRating.measureValue.toFixed(1)}
                        </div>
                        <div
                            class="rating-value"
                            title={i18n.rating}
                            data-isDownload={isDownload}
                        >
                            {songRatingData.songRating.value}
                        </div>
                    </div>
                </div>
            </div>
            {#if opened}
                <div class="detail-body">
                    <div class="body-row">
                        <div class="body-row-name">량</div>
                        <div class="body-row-value">
                            {songDifficultyScoreData.good}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
        {#if !isDownload}
            <a
                class="hiroba"
                href={`https://donderhiroba.jp/score_detail.php?song_no=${songRatingData.songNo}&level=${getDiffNum(songRatingData.difficulty)}`}
                target="_blank"
            >
                {i18n.hiroba}
            </a>
        {/if}
        <!--
        <button class="detail-opener" on:click={toggle}>
            {#if opened}
                ▲
            {:else}
                ▼
            {/if}
        </button>
        -->
    </div>
</div>

<!--
<td class="song-title">
        <a
            style={`color:${color.difficulty[songRatingData.difficulty]} !important;font-weight: bold;`}
            href={`/song/${songRatingData.songNo}`}
        >
            {songData.title}
        </a>
    </td>
    <td>
        {songRatingData.songRating.measureValue}
    </td>
    <td>
        {Math.round(songRatingData.songRating.accuracy * 100) / 100}%
    </td>
    <td>
        {songScoreData?.difficulty[songRatingData.difficulty]?.crown}
    </td>
    <td>
        {Math.round(songRatingData.songRating.value)}
    </td>
    <td>
        <a
            href={`https://donderhiroba.jp/score_detail.php?song_no=${songRatingData.songNo}&level=${getDiffNum(songRatingData.difficulty)}`}
            target="_blank"
        >
            {i18n.link}
        </a>
    </td>
-->

<style>
    /*rgb(142, 142, 142);*/
    .song {
        width: 100%;

        display: flex;
        flex-direction: row;
    }
    .song {
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;
    }
    .song:nth-last-child(1) {
        border-bottom: 1px solid black;
    }
    .song[data-theme="dark"] {
        border-color: rgb(142, 142, 142);
    }

    .order {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;

        width: 30px;

        box-sizing: border-box;
        border-right: 1px solid black;
    }
    .song[data-theme="dark"] .order {
        border-color: rgb(142, 142, 142);
    }

    .detail {
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .detail-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        flex: 1 1 auto;
    }

    .detail-head {
        width: 100%;

        display: flex;
        flex-direction: row;
    }

    .detail-preview {
        width: 100%;
        display: flex;
        flex-direction: row;
        min-height: 30px;
    }
    .detail-preview[data-isMobile="true"] {
        display: block;
        min-height: 60px;
    }

    .detail-layer1 {
        width: calc(100% - 250px);

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .song-title {
        word-break: break-all;
        text-align: center;
        font-weight: bold;
    }
    .detail-preview[data-isMobile="true"] .detail-layer1 {
        width: 100%;
        min-height: 30px;
    }

    .detail-layer2 {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 250px;

        & > div:not(.crown-wrapper) {
            width: calc((100% - 34px) / 3);
        }
    }
    .detail-layer2 > div {
        border-left: 1px solid black;
        box-sizing: border-box;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .song[data-theme="dark"] .detail-layer2 > div {
        border-color: rgb(142, 142, 142);
    }
    .crown-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .crown {
        width: 34px;
        height: 25px;
    }
    .detail-preview[data-isMobile="true"] .detail-layer2 {
        width: 100%;
        height: 30px;
        box-sizing: border-box;
        border-top: 1px solid black;
        & > div:nth-child(1) {
            border: 0;
        }
        & > div {
            width: 25%;
        }
    }
    .song[data-theme="dark"]
        .detail-preview[data-isMobile="true"]
        .detail-layer2 {
        border-color: rgb(142, 142, 142);
    }

    .detail-body {
        width: 100%;
        border-top: 1px solid black;
    }
    .song[data-theme="dark"] .detail-body {
        border-color: rgb(142, 142, 142);
    }

    .hiroba {
        width: min-content;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border-left: 1px solid black;

        padding-inline: 2px;

        word-break: keep-all;
    }
    .song[data-theme="dark"] .hiroba {
        border-color: rgb(142, 142, 142);
    }

    .order[data-isdownload="true"],
    .accuracy[data-isdownload="true"],
    .measure[data-isDownload="true"],
    .rating-value[data-isDownload="true"] {
        color: black;
    }
    /*
    .detail-opener {
        width: 40px;
        height: 100%;
        font-size: 16px;
        color: inherit;

        display: flex;
        justify-content: center;
        align-items: center;

        box-sizing: border-box;
        border: 0;
        border-left: 1px solid black;
        outline: 0;

        padding-top: 3px;

        background-color: transparent;
    }
    .song[data-theme="dark"] .detail-opener {
        border-color: rgb(142, 142, 142);
    }
    */
</style>
