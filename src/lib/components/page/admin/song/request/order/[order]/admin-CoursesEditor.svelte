<script lang="ts">
    // @ts-nocheck
    import TitledContainer from "$lib/components/common/TitledContainer.svelte";
    import CourseEditor from "./admin-CourseEditor.svelte";
    import { DIFFICULTY } from "$lib/module/common/song/const";
    import type { SongData } from "$lib/module/common/song/types";

    interface Props {
        courses: SongData["courses"];
        compare: any;
    }

    let { courses = $bindable(), compare }: Props = $props();
</script>

<TitledContainer title="보면" color="#cf4844">
    <table>
        {#each DIFFICULTY as difficulty}
            <CourseEditor
                {difficulty}
                bind:course={courses[difficulty]}
                compare={compare?.courses?.[difficulty]}
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
