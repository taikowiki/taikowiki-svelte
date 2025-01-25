<script lang="ts">
    import type {
        DifficultyType,
        Section,
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
        playedSongScores: SongScore[] | null;
        userCrownCount: {
            clearCount: number;
            fcCount: number;
            dfcCount: number;
        } | null;
    }

    let {
        section,
        songs,
        theme,
        useMobile = true,
        playedSongScores,
        userCrownCount
    }: Props = $props();

    let closed = $state(false);

    //let playedSongScores = $derived(getPlayedSongScores(userScoreData, section.songs));
    //let userCrownCount = $derived(countUserCrown(userScoreData, section.songs));

    /**
     * "ura"를 "oni_ura"로 바꿉니다.
     * @param diff
     */
     function uraToOniUra(diff: Difficulty): DifficultyType {
        return diff === "ura" ? "oni_ura" : diff;
    }
</script>

<div class="section">
    <DiffchartSectionName
        name={section.name}
        {userCrownCount}
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
                    userScore={playedSongScores?.find(
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
