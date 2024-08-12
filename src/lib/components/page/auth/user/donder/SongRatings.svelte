<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";
    import { Center } from "$lib/module/common/styled";
    import color from "$lib/module/common/color";
    import createSSC from "styled-svelte-component/svelte4";
    import type { UserDonderData } from "$lib/module/common/user/types";

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
</script>

{#if songRatingDatas}
    <Center>
        <h2>곡 레이팅</h2>
        <table>
            <tr>
                <th> 곡 제목 </th>
                <th> 정확도 </th>
                <th> 왕관 </th>
                <th> 레이팅 </th>
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
</style>
