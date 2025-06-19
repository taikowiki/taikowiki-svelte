<script lang="ts" module>
    function parseSongScoreJSON(json: string): Diffchart.Score.SongScore[] | null {
        try {
            let result = JSON.parse(json);
            if (Array.isArray(result)) {
                return result;
            }
            return null;
        } catch (err) {
            return null;
        }
    }
</script>

<script lang="ts">
    import type { Diffchart } from "$lib/module/diffchart";
    import DiffchartName from "./DiffchartName.svelte";
    import DiffchartSection from "./DiffchartSection.svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import { browser } from "$app/environment";
    import html2canvas from "html2canvas";
    import { getI18N, getLang } from "$lib/module/i18n";
    import { Song } from "$lib/module/song";
    import DiffchartAllCrown from "./DiffchartAllCrown.svelte";

    interface Props {
        diffChart: Diffchart.Diffchart;
        songs: Diffchart.SongDataForDisplay[];
        donderData: Diffchart.Score.SongScore[] | null;
        color?: string | undefined;
        backgroundColor?: string | undefined;
        downloadImage: (() => Promise<void>) | null;
    }

    let {
        diffChart,
        songs,
        donderData,
        color = undefined,
        backgroundColor = undefined,
        downloadImage = $bindable(null),
    }: Props = $props();

    const [theme] = getTheme();
    let colorValue = $derived(color ?? diffChart.color);
    let backgroundColorValue = $derived(
        backgroundColor ?? diffChart.backgroundColor,
    );

    let replica: HTMLDivElement;
    $effect(() => {
        if (!browser) {
            return;
        }
        downloadImage = async () => {
            (async () => {
                const canvas = await html2canvas(replica);
                const url = canvas.toDataURL();
                const a = document.createElement("a");
                a.setAttribute("download", `${i18n.diffchart}.png`);
                a.href = url;
                a.click();
                a.remove();
                canvas.remove();
            })();
            alert(i18n.downloadMessage);
        };
    });

    let userScoreDataJSON: string = ""; // 확장 프로그램
    let userScoreData = $derived(
        parseSongScoreJSON(userScoreDataJSON) ?? donderData,
    );
    let sortedDifferChartSections = $derived(
        diffChart.sections.toSorted((a, b) => a.order - b.order),
    );

    /**
     * 플레이한 곡 기록 데이터
     */
    let playedSongScoreMap = $derived.by(() => {
        const map = new Map<Diffchart.Section, Diffchart.Score.SongScore[] | null>();
        sortedDifferChartSections.forEach((section) => {
            map.set(section, getPlayedSongScores(userScoreData, section.songs));
        });
        return map;
    });
    /**
     * 플레이한 곡 왕관 개수
     */
    let userCrownCountMap = $derived.by(() => {
        const map = new Map<Diffchart.Section, ReturnType<typeof countUserCrown>>();
        sortedDifferChartSections.forEach((section) => {
            const playedScoreData = playedSongScoreMap.get(section);
            if (typeof playedScoreData === "undefined") return;
            map.set(section, countUserCrown(playedScoreData, section.songs));
        });
        return map;
    });
    let allCrownCount = $derived.by(() => {
        const songScoreSet = new Set<Diffchart.Score.SongScore>();
        for (const values of playedSongScoreMap.values()) {
            if (!values) continue;
            for (const value of values) {
                songScoreSet.add(value);
            }
        }
        let songScores = Array.from(songScoreSet).map((e) =>
            structuredClone(e),
        );

        if (songScores.length === 0) return null;

        let clearCount = 0;
        let fcCount = 0;
        let dfcCount = 0;

        sortedDifferChartSections.forEach((section) => {
            section.songs.forEach((diffchartSongData) => {
                const scoreDataIndex = songScores.findIndex(
                    (score) =>
                        score.songNo === diffchartSongData.songNo &&
                        score.details[uraToOniUra(diffchartSongData.difficulty)]
                            ?.crown &&
                        score.details[uraToOniUra(diffchartSongData.difficulty)]
                            ?.crown !== "none",
                );
                const scoreData = songScores[scoreDataIndex];

                if (!scoreData) return;

                const diff =
                    scoreData.details[
                        uraToOniUra(diffchartSongData.difficulty)
                    ];

                if (!diff) return;

                const crown = diff?.crown as Diffchart.Score.Crown;

                if (crown === "silver") {
                    clearCount++;
                } else if (crown === "gold") {
                    fcCount++;
                } else if (crown === "donderfull") {
                    dfcCount++;
                }

                delete scoreData.details[
                    uraToOniUra(diffchartSongData.difficulty)
                ];
            });
        });

        return {
            clearCount,
            fcCount,
            dfcCount,
        };
    });

    const lang = getLang();
    let i18n = $derived(getI18N("component", $lang).Diffchart);

    /**
     * 유저 스코어 데이터에서 클리어, 풀콤, 전량 갯수를 가져옵니다.
     * @param userScoreData
     * @param diffchartSongDatas
     */
    function countUserCrown(
        userScoreData: Diffchart.Score.SongScore[] | null,
        diffchartSongDatas: Diffchart.Song[],
    ) {
        if (userScoreData === null) {
            return null;
        }

        let clearCount = 0;
        let fcCount = 0;
        let dfcCount = 0;

        diffchartSongDatas.forEach((diffchartSongData) => {
            const scoreData = userScoreData.find(
                (score) =>
                    score.songNo === diffchartSongData.songNo &&
                    score.details[uraToOniUra(diffchartSongData.difficulty)]
                        ?.crown &&
                    score.details[uraToOniUra(diffchartSongData.difficulty)]
                        ?.crown !== "none",
            );

            if (!scoreData) return;

            const crown = scoreData.details[
                uraToOniUra(diffchartSongData.difficulty)
            ]?.crown as Diffchart.Score.Crown;

            if (crown === "silver") {
                clearCount++;
            } else if (crown === "gold") {
                fcCount++;
            } else if (crown === "donderfull") {
                dfcCount++;
            }
        });

        return {
            clearCount,
            fcCount,
            dfcCount,
        };
    }

    /**
     * 플레이한 유저 스코어 데이터를 가져옵니다.
     * @param scoreData
     * @param songs
     */
    function getPlayedSongScores(
        scoreData: Diffchart.Score.SongScore[] | null,
        songs: Diffchart.Song[],
    ): Diffchart.Score.SongScore[] | null {
        return (
            scoreData?.filter((score) =>
                songs.find(
                    (song) =>
                        song.songNo === score.songNo &&
                        score.details[uraToOniUra(song.difficulty)]?.badge !==
                            null,
                ),
            ) ?? null
        );
    }

    /**
     * "ura"를 "oni_ura"로 바꿉니다.
     * @param diff
     */
    function uraToOniUra(diff: Song.Difficulty): Diffchart.Score.Difficulty {
        return diff === "ura" ? "oni_ura" : diff;
    }
</script>

<input
    type="text"
    onchange={(event) => {
        userScoreDataJSON = event.currentTarget.value;
    }}
    id="scoredata_input"
    style="display:none;"
/>
<div class="container">
    <DiffchartAllCrown {allCrownCount} theme={$theme} />
    <DiffchartName
        name={diffChart.name}
        color={colorValue}
        backgroundColor={backgroundColorValue}
    />
    {#each sortedDifferChartSections as section}
        {@const playedSongScores = playedSongScoreMap.get(section) as
            | Diffchart.Score.SongScore[]
            | null}
        {@const userCrownCount = userCrownCountMap.get(section) as ReturnType<
            typeof countUserCrown
        >}
        <DiffchartSection
            {section}
            {songs}
            theme={$theme}
            {playedSongScores}
            {userCrownCount}
        />
    {/each}
</div>

<div class="replica" bind:this={replica}>
    <DiffchartAllCrown {allCrownCount} theme="light" />
    <DiffchartName
        name={diffChart.name}
        color={colorValue}
        backgroundColor={backgroundColorValue}
    />
    {#each sortedDifferChartSections as section}
        {@const playedSongScores = playedSongScoreMap.get(section) as
            | Diffchart.Score.SongScore[]
            | null}
        {@const userCrownCount = userCrownCountMap.get(section) as ReturnType<
            typeof countUserCrown
        >}
        <DiffchartSection
            {section}
            {songs}
            theme={"light"}
            useMobile={false}
            {playedSongScores}
            {userCrownCount}
        />
    {/each}
</div>

<style>
    .container {
        width: 100%;

        display: flex;
        flex-direction: column;
    }

    .replica {
        width: 1200px;
        position: absolute;

        background-color: white;

        top: 0;
        left: 0;

        transform: translateX(-100%);
    }
</style>
