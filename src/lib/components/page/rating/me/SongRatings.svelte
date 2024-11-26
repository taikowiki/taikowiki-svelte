<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";
    import color from "$lib/module/common/color";
    import type { UserDonderData } from "$lib/module/common/user/types";
    import { getTheme } from "$lib/module/layout/theme";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import type { getRating } from "@taiko-wiki/taiko-rating";

    export let ratings: ReturnType<typeof getRating>;
    export let songDatas: Pick<SongData, "songNo" | "title">[];
    export let donderData: UserDonderData;
    export let only50: boolean = false;

    let subOpened = false;

    const [theme] = getTheme();
    const lang = getLang();
    $: i18n = getI18N("/auth/user/donder", $lang);
    $: newI18n = getI18N($lang).page.donder;

    function getDiffNum(diff: "oni" | "ura") {
        if (diff === "oni") {
            return 4;
        } else {
            return 5;
        }
    }
</script>

<div class="center">
    <h3>{newI18n.rating.top} 50{newI18n.song}</h3>
    <table data-theme={$theme}>
        <tr>
            <th class="song-title"> {i18n.songTitle} </th>
            <th> {i18n.measureValue} </th>
            <th> {i18n.accuracy} </th>
            <th> {i18n.crown} </th>
            <th> {i18n.rating} </th>
            <th> {i18n.hiroba} </th>
        </tr>
        {#each ratings.songRatingDatas.slice(0, Math.min(50, ratings.songRatingDatas.length)) as songRatingData, index}
            {@const song = songDatas.find(
                ({ songNo }) => songNo === songRatingData.songNo.toString(),
            )}
            {@const songScoreData =
                donderData.scoreData?.[songRatingData.songNo]}
            <tr class="song top50">
                <td class="song-title">
                    <a
                        style={`color:${color.difficulty[songRatingData.difficulty]} !important;font-weight: bold;`}
                        href={`/song/${songRatingData.songNo}`}
                    >
                        {song?.title}
                    </a>
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
                        {newI18n.link}
                    </a>
                </td>
            </tr>
        {/each}
    </table>
    {#if !only50}
        <h3
            class="other"
            class:subOpened
            role="presentation"
            on:click={() => {
                subOpened = !subOpened;
            }}
        >
            {newI18n.otherSong}
        </h3>
        {#if subOpened}
            <table data-theme={$theme}>
                <tr>
                    <th class="song-title"> {i18n.songTitle} </th>
                    <th> {i18n.measureValue} </th>
                    <th> {i18n.accuracy} </th>
                    <th> {i18n.crown} </th>
                    <th> {i18n.rating} </th>
                    <th> {i18n.hiroba} </th>
                </tr>
                {#each ratings.songRatingDatas.slice(Math.min(50, ratings.songRatingDatas.length), ratings.songRatingDatas.length) as songRatingData, index}
                    {@const song = songDatas.find(
                        ({ songNo }) =>
                            songNo === songRatingData.songNo.toString(),
                    )}
                    {@const songScoreData =
                        donderData.scoreData?.[songRatingData.songNo]}
                    <tr class="song">
                        <td class="song-title">
                            <a
                                style={`color:${color.difficulty[songRatingData.difficulty]} !important;font-weight: bold;`}
                                href={`/song/${songRatingData.songNo}`}
                            >
                                {song?.title}
                            </a>
                        </td>
                        <td>
                            {songRatingData.songRating.measureValue}
                        </td>
                        <td>
                            {Math.round(
                                songRatingData.songRating.accuracy * 100,
                            ) / 100}%
                        </td>
                        <td>
                            {songScoreData?.difficulty[
                                songRatingData.difficulty
                            ]?.crown}
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
        color: black;
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
