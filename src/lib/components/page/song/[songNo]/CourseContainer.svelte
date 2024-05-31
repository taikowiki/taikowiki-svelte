<script lang="ts">
    import type { Difficulty, SongData } from "$lib/module/common/song/types";
    import CourseDisplay from "./CourseDisplay.svelte";
    import color from "$lib/module/common/color";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";
    import FumenDisplay from "./FumenDisplay.svelte";

    export let courses: SongData["courses"];

    let difficulties: Difficulty[] = ["easy", "normal", "hard", "oni", "ura"];

    let selectedDifficulty: Difficulty = "oni";

    const isMobile = getIsMobile();
    const [theme] = getTheme();

    $: course = courses[selectedDifficulty];
</script>

<div class="container" data-isMobile={$isMobile}>
    <div class="difficulty-container" data-isMobile={$isMobile}>
        {#each difficulties as difficulty}
            {#if courses[difficulty]}
                <div
                    class="difficulty"
                    class:selected={selectedDifficulty === difficulty}
                    role="presentation"
                    on:click={() => {
                        selectedDifficulty = difficulty;
                    }}
                    style={`background-color:${color.difficulty[difficulty]};`}
                >
                    ★ {courses[difficulty]?.level}
                </div>
            {/if}
        {/each}
    </div>
    {#key selectedDifficulty}
        <CourseDisplay {course} />
    {/key}
</div>
{#if course?.images !== undefined}
    <FumenDisplay images={course.images} />
{/if}

<style>
    .container {
        display: flex;
        flex-direction: row;

        margin-top: 10px;
    }
    .container[data-isMobile="true"] {
        flex-direction: column;
    }

    .difficulty-container {
        width: 80px;

        display: flex;
        flex-direction: column;
        align-items: flex-end;

        row-gap: 5px;
    }
    .difficulty-container[data-isMobile="true"] {
        height: 50px;
        flex-direction: row;
        width: auto;

        column-gap: 5px;

        justify-content: flex-start;
    }

    .difficulty {
        color: white;

        width: 50px;
        height: 30px;

        font-size: 18px;
        font-weight: bold;

        transition:
            width 0.1s,
            height 0.1s;
        padding-bottom: 0.1s;

        padding-left: 3px;
        padding-bottom: 1px;
        box-sizing: border-box;

        border-radius: 5px 0px 0px 5px;

        display: flex;
        align-items: center;

        cursor: pointer;
    }
    .difficulty.selected {
        width: 80px;
    }
    .difficulty-container[data-isMobile="true"] .difficulty {
        width: 50px;
        height: 40px;

        border-radius: 5px 5px 0px 0px;

        justify-content: center;
        align-items: center;

        padding-left: 0;
        padding-bottom: 0;
        padding-right: 2px;
    }
    .difficulty-container[data-isMobile="true"] .difficulty.selected {
        height: 50px;
        padding-bottom: 10px;
    }
</style>
