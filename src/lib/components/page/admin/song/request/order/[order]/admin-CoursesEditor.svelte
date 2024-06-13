<script lang="ts">
    // @ts-nocheck
    import TitledContainer from "$lib/components/common/TitledContainer.svelte";
    import CourseEditor from "./admin-CourseEditor.svelte";
    import { DIFFICULTY } from "$lib/module/common/song/const";
    import type { SongData } from "$lib/module/common/song/types";

    export let courses: SongData["courses"];
    export let compare: {
        keys: string[];
        courseKeys: string[];
    } | null;
</script>

<TitledContainer title="보면" color="#cf4844">
    <table>
        {#each DIFFICULTY as difficulty}
            <CourseEditor
                {difficulty}
                bind:course={courses[difficulty]}
                different={compare?.courseKeys.includes(difficulty)}
            />
        {/each}
    </table>
</TitledContainer>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
</style>
