<script lang="ts">
    // @ts-nocheck
    import TitledContainer from "$lib/components/common/TitledContainer.svelte";
    import CourseEditor from "$lib/components/common/song/editor/CourseEditor.svelte";
    import { DIFFICULTY } from "$lib/module/common/song/const";
    import type { SongData } from "$lib/module/common/song/types";

    interface Props{
        courses: SongData["courses"]
    }

    let {courses = $bindable()}: Props = $props();
</script>

<TitledContainer title="보면" color="#cf4844">
    <div class="div-table">
        {#each DIFFICULTY as difficulty}
            <CourseEditor {difficulty} bind:course={courses[difficulty]} />
        {/each}
    </div>
</TitledContainer>

<style>
    .div-table {
        width: 100%;
        border-collapse: collapse;
    }
</style>
