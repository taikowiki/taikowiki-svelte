<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";
    import { Center } from "$lib/module/common/styled";
    import color from "$lib/module/common/color";
    import createSSC from "styled-svelte-component/svelte4";
    import type { UserDonderData } from "$lib/module/common/user/types";
    import { getTheme } from "$lib/module/layout/theme";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import type { getRating } from "@taiko-wiki/taiko-rating";
    import type { Action } from "svelte/action";

    export let ratings: ReturnType<typeof getRating>;
    export let songDatas: Pick<SongData, "songNo" | "title">[];
    export let donderData: UserDonderData;
    export let opened: boolean;

    const DiffColoredTitle = createSSC<{ difficulty: "oni" | "ura" }>(
        "a",
        ({ difficulty }) => `
            color:${color.difficulty[difficulty]} !important;font-weight: bold;
        `,
    );

    const visibilityAction: Action<HTMLElement, boolean> = (node, opened) => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    node.style.visibility = "visible";
                } else {
                    node.style.visibility = "hidden";
                }
            },
            {
                threshold: 0,
            },
        );

        if (opened) {
            observer.observe(node);
        }

        return {
            destroy() {
                observer.disconnect();
            },
            update(opened) {
                if (opened) {
                    observer.observe(node);
                } 
                else {
                    observer.unobserve(node);
                    node.style.visibility = "hidden";
                }
            },
        };
    };

    const [theme] = getTheme();
    const lang = getLang();
    $: i18n = getI18N("/auth/user/donder", $lang);

    function getDiffNum(diff: "oni" | "ura") {
        if (diff === "oni") {
            return 4;
        } else {
            return 5;
        }
    }
</script>

<Center>
    <table data-theme={$theme}>
        <tr>
            <th class="song-title"> {i18n.songTitle} </th>
            <th> {i18n.measureValue} </th>
            <th> {i18n.accuracy} </th>
            <th> {i18n.crown} </th>
            <th> {i18n.rating} </th>
            <th> {i18n.hiroba} </th>
        </tr>
        {#each ratings.songRatingDatas as songRatingData, index}
            {@const song = songDatas.find(
                ({ songNo }) => songNo === songRatingData.songNo.toString(),
            )}
            {@const songScoreData =
                donderData.scoreData?.[songRatingData.songNo]}
            <tr class:top50={index < 50} use:visibilityAction={opened}>
                <td class="song-title">
                    <DiffColoredTitle
                        difficulty={songRatingData.difficulty}
                        href={`/song/${songRatingData.songNo}`}
                    >
                        {song?.title}
                    </DiffColoredTitle>
                </td>
                <td>
                    {songRatingData.songRating.measureValue}
                </td>
                <td>
                    {Math.round(songRatingData.songRating.accuracy * 100) /
                        100}%
                </td>
                <td>
                    {songScoreData?.difficulty[songRatingData.difficulty]
                        ?.crown}
                </td>
                <td>
                    {Math.round(songRatingData.songRating.value)}
                </td>
                <td>
                    <a
                        href={`https://donderhiroba.jp/score_detail.php?song_no=${songRatingData.songNo}&level=${getDiffNum(songRatingData.difficulty)}`}
                        target="_blank"
                    >
                        링크
                    </a>
                </td>
            </tr>
        {/each}
    </table>
</Center>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th {
        font-size: medium;
        word-break: keep-all;
    }
    td {
        border: 1px solid black;
        text-align: center;
        box-sizing: border-box;
        padding-bottom: 4px;
        word-break: keep-all;
    }

    .song-title {
        word-break: break-all;
    }

    td:not(:nth-child(1)) {
        padding-inline: 3px;
    }

    table[data-theme="dark"] td {
        border-color: rgb(142, 142, 142);
    }

    .top50 {
        background-color: #ffdbe2;
    }
</style>
