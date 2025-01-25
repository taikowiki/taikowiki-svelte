<script lang="ts">
    import type { Difficulty, SongData } from "$lib/module/common/song/types";
    import CourseDisplay from "./CourseDisplay.svelte";
    import color from "$lib/module/common/color";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { page } from "$app/stores";
    import { replaceState } from "$app/navigation";

    interface Props {
        courses: SongData["courses"];
        selectedDifficulty: Difficulty;
    }

    let { courses, selectedDifficulty = $bindable() }: Props = $props();

    let difficulties: Difficulty[] = ["easy", "normal", "hard", "oni", "ura"];

    const isMobile = getIsMobile();

    let course = $derived(courses[selectedDifficulty]);
</script>

{#snippet diffBtn(difficulty: Difficulty)}
    {#if courses[difficulty]}
        <div
            class="difficulty"
            class:selected={selectedDifficulty === difficulty}
            role="presentation"
            onclick={() => {
                selectedDifficulty = difficulty;
                $page.url.searchParams.set("diff", difficulty);
                replaceState($page.url, $page.state);
            }}
            style={`background-color:${color.difficulty[difficulty]};`}
        >
            <span data-isMobile={$isMobile}>
                ★ {courses[difficulty]?.level}
            </span>
        </div>
    {/if}
{/snippet}

<div class="container" data-isMobile={$isMobile}>
    <div class="difficulty-container" data-isMobile={$isMobile}>
        {#each difficulties as difficulty}
            {@render diffBtn(difficulty)}
        {/each}
    </div>
    {#key selectedDifficulty}
        <CourseDisplay {course} />
    {/key}
</div>

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
        height: 170px;

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

    span[data-isMobile="false"] {
        transform: translateY(-1px);
    }
</style>
