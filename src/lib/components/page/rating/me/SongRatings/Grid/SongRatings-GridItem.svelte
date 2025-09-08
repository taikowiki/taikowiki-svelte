<script lang="ts">
    import type { getRating } from "@taiko-wiki/taiko-rating";
    import type { Crown, DifficultyScoreData } from "node-hiroba/types";
    import { Util } from "$lib/module/util";
    import { getI18N, getLang } from "$lib/module/i18n";
    import { Song } from "$lib/module/song";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";
    import { User } from "$lib/module/user";

    interface Props {
        songRatingData: ReturnType<typeof getRating>["songRatingDatas"][number];
        songDifficultyScoreData: DifficultyScoreData;
        songData: Pick<Song.SongData, "songNo" | "title">;
        isTop50: boolean;
        order: number;
        forDownload?: boolean;
    }

    let {
        songRatingData,
        songDifficultyScoreData,
        songData,
        isTop50,
        order,
        forDownload = false,
    }: Props = $props();

    const isMobileStore = getIsMobile();
    let isMobile = $derived(forDownload ? false : $isMobileStore);

    const targetTier = User.getTier(songRatingData.songRating.value).tierName;
    const tierColor =
        targetTier === "omega"
            ? "linear-gradient(45deg, #ffa0fe, #56fbb9, #63abf8)"
            : User.TIER_COLOR[targetTier];

    const themeStore = getTheme()[0];
    let theme = $derived(forDownload ? "light" : $themeStore);

    function getMeasureColor(measure: number) {
        const one = [0, 18, 214];
        const twelve = [214, 0, 0];

        const rgb = one.map((v, i) => {
            if (v > twelve[i]) {
                const gap = v - twelve[i];

                return v - (gap / 11) * (measure - 1);
            } else {
                const gap = twelve[i] - v;

                return v + (gap / 11) * (measure - 1);
            }
        });

        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }
</script>

<a
    class={`song ${songRatingData.difficulty}`}
    href={`/song/${songData.songNo}?diff=${songRatingData.difficulty}`}
    data-theme={theme}
>
    {@render details1()}
    <div class={`title ${songRatingData.difficulty}`} data-theme={theme} data-isMobile={isMobile}>
        {songData.title}
    </div>
    {@render details2()}
</a>

{#snippet details1()}
    <div class="details" data-theme={theme}>
        <div class="left">
            {#if isMobile}
                <div class="order">#{order}</div>
                <div
                    class="rating"
                    class:black={targetTier === "pearl" ||
                        targetTier === "omega"}
                    style={`background: ${tierColor};`}
                >
                    {songRatingData.songRating.value}
                </div>
            {:else}
                <div class="order">#{order}</div>
            {/if}
        </div>
        <div class="right">
            {#if isMobile}
                <div
                    class="measure"
                    style={`background-color: ${getMeasureColor(songRatingData.songRating.measureValue)};`}
                >
                    {songRatingData.songRating.measureValue}
                </div>
                <div class={`accuracy ${songDifficultyScoreData.crown}`}>
                    {songRatingData.songRating.accuracy.toFixed(2)}%
                </div>
            {:else}
                <div
                    class="rating"
                    class:black={targetTier === "pearl" ||
                        targetTier === "omega"}
                    style={`background: ${tierColor};`}
                >
                    {songRatingData.songRating.value}
                </div>
            {/if}
        </div>
    </div>
{/snippet}
{#snippet details2()}
    <div class="details" data-theme={theme}>
        {#if isMobile}
            <div style="height: 20px;"></div>
        {:else}
            <div class="left">
                <div
                    class="measure"
                    style={`background-color: ${getMeasureColor(songRatingData.songRating.measureValue)};`}
                >
                    {songRatingData.songRating.measureValue}
                </div>
            </div>
            <div class="right">
                <div class={`accuracy ${songDifficultyScoreData.crown}`}>
                    {songRatingData.songRating.accuracy.toFixed(2)}%
                </div>
            </div>
        {/if}
    </div>
{/snippet}

<style>
    .song {
        width: 100%;
        min-height: 50px;

        box-sizing: border-box;
        padding: 7px;

        border-radius: 10px;

        display: flex;
        flex-direction: column;

        border: 3px solid;

        &[data-theme="light"] {
            background-color: #ffffff;
        }
        &[data-theme="dark"] {
            background-color: #1c1c1c;
        }

        &.oni {
            border-color: #db1885;
        }
        &.ura {
            border-color: #7135db;
        }
    }

    .title {
        flex: 1 0 auto;

        font-weight: bold;
        font-size: 16px;

        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        padding-top: 2px;
        padding-bottom: 3px;

        color: black;
        &[data-theme="dark"] {
            color: white;
        }
        &[data-isMobile="true"]{
            padding-bottom: 10px;
        }
    }

    .details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: rgb(60, 60, 60);
        font-size: 12px;

        & .left,
        & .right {
            display: flex;
            align-items: center;
            column-gap: 5px;
        }

        & .order {
            background-color: rgb(43, 43, 43);
            height: 20px;
            color: white;
        }
        & .rating {
            height: 20px;
            color: white;
            &.black {
                color: black;
            }
        }
        & .measure {
            font-size: 10px;
            height: 16px;
            color: white;
        }
        & .accuracy {
            font-size: 10px;
            height: 16px;
            color: black;

            background-color: white;
            &.gold {
                background-color: #ffe972;
            }
            &.silver {
                background-color: #d4e8ff;
            }
            &.donderfull {
                background: linear-gradient(
                    45deg,
                    #ffb3ba,
                    /* pink */ #ffdfba,
                    /* peach */ #ffffba,
                    /* yellow */ #baffc9,
                    /* mint */ #bae1ff /* light blue */
                );
            }
        }

        & .order,
        & .rating,
        & .measure,
        & .accuracy {
            font-weight: bold;
            border-radius: 5px;
            padding-inline: 5px;
            padding-bottom: 1px;

            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
