<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";
    import { Center } from "$lib/module/common/styled";
    import color from "$lib/module/common/color";
    import createSSC from "styled-svelte-component/svelte4";
    import type { UserDonderData } from "$lib/module/common/user/types";
    import { getTheme } from "$lib/module/layout/theme";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";

    export let songRatingDatas:
        | {
              songNo: string;
              difficulty: "oni" | "ura";
              songRating: {
                  value: number;
                  accuracy: number;
              };
          }[]
        | undefined;
    export let songDatas: Pick<SongData, "songNo" | "title">[];
    export let donderData: UserDonderData;

    const DiffColoredTitle = createSSC<{ difficulty: "oni" | "ura" }>(
        "a",
        ({ difficulty }) => `
            color:${color.difficulty[difficulty]} !important;font-weight: bold;
        `,
    );

    const Tr50 = createSSC<{ index: number }>(
        "tr",
        ({ index }) =>
            `${index < 50 ? "background-color:#ffdbe2;color:black;" : ""}`,
    );

    const [theme] = getTheme();
    const lang = getLang();
    $: i18n = getI18N('/auth/user/donder', $lang);
</script>

{#if songRatingDatas}
    <Center>
        <h2>{i18n.songRating}</h2>
        <table data-theme={$theme}>
            <tr>
                <th> {i18n.songTitle} </th>
                <th> {i18n.accuracy} </th>
                <th> {i18n.crown} </th>
                <th> {i18n.rating} </th>
            </tr>
            {#each songRatingDatas as songRatingData, index}
                {@const song = songDatas.find(
                    ({ songNo }) => songNo === songRatingData.songNo.toString(),
                )}
                {@const songScoreData = donderData.scoreData?.[songRatingData.songNo]}

                <Tr50 {index}>
                    <td>
                        <DiffColoredTitle
                            difficulty={songRatingData.difficulty}
                            href={`/song/${songRatingData.songNo}`}
                        >
                            {song?.title}
                        </DiffColoredTitle>
                    </td>
                    <td>
                        {Math.round(songRatingData.songRating.accuracy * 100) /
                            100}%
                    </td>
                    <td>
                        {songScoreData?.difficulty[songRatingData.difficulty]?.crown}
                    </td>
                    <td>
                        {Math.round(songRatingData.songRating.value)}
                    </td>
                </Tr50>
            {/each}
        </table>
    </Center>
{/if}

<style>
    h2{
        margin-bottom: 0;
    }

    table {
        max-width: 100%;
        border-collapse: collapse;
    }

    th{
        font-size:medium;
    }
    td {
        border: 1px solid black;
        text-align: center;
        box-sizing: border-box;
        padding-bottom: 4px;
    }

    td:not(:nth-child(1)) {
        padding-inline: 3px;
    }

    table[data-theme="dark"] td{
        border-color: rgb(142, 142, 142);
    }
</style>
