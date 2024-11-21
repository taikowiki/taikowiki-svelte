<script lang="ts" context="module">
    function getClearedSongScores(
        scoreData: SongScore[] | null,
        songs: Song[],
    ): SongScore[] {
        return scoreData?.filter((score) => songs.find((song) => song.songNo === score.songNo && score.details[uraToOniUra(song.difficulty)]?.crown !== "none")) ?? [];
    }

    function getPlayedSongScores(
        scoreData: SongScore[] | null,
        songs: Song[],
    ): SongScore[] {
        return scoreData?.filter((score) => songs.find((song) => song.songNo === score.songNo && score.details[uraToOniUra(song.difficulty)]?.badge !== null)) ?? [];
    }

    function uraToOniUra(diff: Difficulty): DifficultyType {
        return diff === "ura" ? "oni_ura" : diff;
    }
</script>

<script lang="ts">
    import type {
        DifficultyType,
        Section,
        Song,
        SongScore,
    } from "$lib/module/common/diffchart/types";
    import DiffchartSectionName from "./DiffchartSectionName.svelte";
    import DiffchartSong from "./DiffchartSong.svelte";
    import type { Difficulty } from "$lib/module/common/song/types";
    import type { SongDataPickedForDiffchart } from "$lib/module/common/diffchart/types";

    export let section: Section;
    export let songs: SongDataPickedForDiffchart[];
    export let theme: string;
    export let useMobile: boolean = true;
    export let userScoreData: SongScore[] | null;

    let closed = false;

    $: clearedSongScores = getClearedSongScores(userScoreData, section.songs);
    $: playedSongScores = getPlayedSongScores(userScoreData, section.songs);
    $: clearedSongsCount = userScoreData ? clearedSongScores.length : null;
</script>

<div class="section">
    <DiffchartSectionName
        name={section.name}
        {clearedSongsCount}
        color={section.color}
        backgroundColor={section.backgroundColor}
        closed={closed}
        on:click={() => {
            closed = !closed;
            console.log("clicked" + section.name);
        }}
    />
    {#if !closed}
    <div class="song-container" class:useMobile>
        {#each section.songs.toSorted((a, b) => a.order - b.order) as song}
            <DiffchartSong
                {song}
                {songs}
                {theme}
                {useMobile}
                userScore={playedSongScores.find((score) => score.songNo === song.songNo)?.details[uraToOniUra(song.difficulty)] ?? null}
            />
        {/each}
    </div>
    {/if}
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
