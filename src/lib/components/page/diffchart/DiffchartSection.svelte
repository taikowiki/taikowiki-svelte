<script lang="ts" module>
    function getClearedSongScores(
        scoreData: SongScore[] | null,
        songs: Song[],
    ): SongScore[] {
        return (
            scoreData?.filter((score) =>
                songs.find(
                    (song) =>
                        song.songNo === score.songNo &&
                        score.details[uraToOniUra(song.difficulty)]?.crown !==
                            "none",
                ),
            ) ?? []
        );
    }

    function getPlayedSongScores(
        scoreData: SongScore[] | null,
        songs: Song[],
    ): SongScore[] {
        return (
            scoreData?.filter((score) =>
                songs.find(
                    (song) =>
                        song.songNo === score.songNo &&
                        score.details[uraToOniUra(song.difficulty)]?.badge !==
                            null,
                ),
            ) ?? []
        );
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

    interface Props {
        section: Section;
        songs: SongDataPickedForDiffchart[];
        theme: string;
        useMobile?: boolean;
        userScoreData: SongScore[] | null;
    }

    let {
        section,
        songs,
        theme,
        useMobile = true,
        userScoreData,
    }: Props = $props();

    let closed = $state(false);

    let clearedSongScores = $derived(getClearedSongScores(userScoreData, section.songs));
    let playedSongScores = $derived(getPlayedSongScores(userScoreData, section.songs));
    let clearedSongsCount = $derived(userScoreData ? clearedSongScores.length : null);
</script>

<div class="section">
    <DiffchartSectionName
        name={section.name}
        {clearedSongsCount}
        color={section.color}
        backgroundColor={section.backgroundColor}
        {closed}
        onclick={() => (closed = !closed)}
    />
    {#if !closed}
        <div class="song-container" class:useMobile>
            {#each section.songs.toSorted((a, b) => a.order - b.order) as song}
                <DiffchartSong
                    {song}
                    {songs}
                    {theme}
                    {useMobile}
                    userScore={playedSongScores.find(
                        (score) => score.songNo === song.songNo,
                    )?.details[uraToOniUra(song.difficulty)] ?? null}
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
