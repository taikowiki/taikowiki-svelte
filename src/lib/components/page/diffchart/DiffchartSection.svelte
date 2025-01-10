<script lang="ts" module>
    function getPlayedSongScores(
        scoreData: SongScore[] | null,
        songs: DiffchartSongData[],
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
        DiffchartSongData,
        SongScore,
        CrownType,
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

    let playedSongScores = $derived(getPlayedSongScores(userScoreData, section.songs));
    let userCrownCount = $derived(countUserCrown(userScoreData, section.songs));

    /**
     * 유저 스코어 데이터에서 클리어, 풀콤, 전량 갯수를 가져옵니다.
     * @param userScoreData
     * @param diffchartSongDatas
     */
    function countUserCrown(userScoreData: SongScore[] | null, diffchartSongDatas: DiffchartSongData[]){
        if(userScoreData === null){
            return null;
        }

        let clearCount = 0;
        let fcCount = 0;
        let dfcCount = 0;

        diffchartSongDatas.forEach((diffchartSongData) => {
            const scoreData = userScoreData.find((score) => 
                (
                    score.songNo === diffchartSongData.songNo && 
                    score.details[uraToOniUra(diffchartSongData.difficulty)]?.crown &&
                    score.details[uraToOniUra(diffchartSongData.difficulty)]?.crown !== "none"
                )
            );

            if(!scoreData) return;

            const crown = scoreData.details[uraToOniUra(diffchartSongData.difficulty)]?.crown as CrownType;

            if(crown === "silver"){
                clearCount++;
            }
            else if(crown === "gold"){
                fcCount++;
            }
            else if(crown === "donderfull"){
                dfcCount++;
            }
        });

        return {
            clearCount,
            fcCount,
            dfcCount
        }
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
