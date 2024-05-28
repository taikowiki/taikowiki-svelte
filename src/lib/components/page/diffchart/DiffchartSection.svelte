<script lang="ts" context="module">
    function getClearedSongScores(
        scoreData: SongScore[] | null,
        songs: Song[],
    ): SongScore[] | null {
        if (scoreData === null) return null;
        return scoreData.filter(
            (score) => songs.find((song) => song.songNo === score.songNo && score.details[uraToOniUra(song.difficulty)] !== undefined && score.details[uraToOniUra(song.difficulty)]?.crown !== "none") !== undefined
        );
    }

    function uraToOniUra(diff: Difficulty): DifficultyType {
        if (diff === "ura") {
            return "oni_ura";
        }
        return diff;
    }
</script>

<script lang="ts">
    import type {
    DifficultyType,
        Section,
        Song,
        SongScore,
    } from "$lib/module/common/diffchart/types";
    import { getLang, getI18N } from "$lib/module/common/i18n/i18n";
    import DiffchartSectionName from "./DiffchartSectionName.svelte";
    import DiffchartSong from "./DiffchartSong.svelte";
    import type { Difficulty, SongData } from "$lib/module/common/song/types";

    export let section: Section;
    export let songs: SongData[];
    export let theme: string;
    export let useMobile: boolean = true;
    export let userScoreData: SongScore[] | null;

    const lang = getLang();
    $: i18n = getI18N("/diffchart/clear/[level]", $lang);
    $: name = i18n.sections[section.name];

    const sectionColor: Record<string, string> = {
        SSS: "#B93FEA",
        SS: "#E8348F",
        S: "#EF3059",
        A: "#EB7535",
        B: "#E6B439",
        C: "#60CE37",
        D: "#37B0CB",
        E: "#4161D8",
        X: "#adadad",
    };

    $: clearedSongScores = getClearedSongScores(userScoreData, section.songs);
</script>

<div class="section">
    <DiffchartSectionName
        {name}
        {clearedSongScores}
        color={section.color}
        backgroundColor={sectionColor[section.name] || section.backgroundColor}
    />
    <div class="song-container" class:useMobile>
        {#each section.songs.toSorted((a, b) => a.order - b.order) as song}
            <DiffchartSong
                {song}
                {songs}
                {theme}
                {useMobile}
                userScore={clearedSongScores?.find(
                    (score) => score.songNo === song.songNo,
                )?.details[uraToOniUra(song.difficulty)] ?? null}
            />
        {/each}
    </div>
</div>

<style>
    .song-container {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, 190px);
        justify-content: center;
        row-gap: 8px;
        column-gap: 8px;

        transform: translateY(-25px);
    }

    @media only screen and (max-width: 1000px) {
        .song-container.useMobile {
            display: flex;

            flex-direction: column;
            align-items: center;
            row-gap: 4px;

            transform: translateY(-25px);
        }
    }
</style>
