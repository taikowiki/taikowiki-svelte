<script lang="ts">
    // @ts-nocheck
    import TitledContainer from "$lib/components/common/TitledContainer.svelte";
    import CourseEditor from "$lib/components/common/song/editor/CourseEditor.svelte";
    import { getI18N, getLang } from "$lib/module/i18n";
    import { DIFFICULTY } from "$lib/module/common/song/const";
    import type { SongData } from "$lib/module/common/song/types";

    interface Props{
        courses: SongData["courses"]
    }

    let {courses = $bindable()}: Props = $props();

    const lang = getLang();
    let i18n = $derived(getI18N($lang).component.SongEditor.CoursesEditor);
</script>

<TitledContainer title={i18n.course} color="#cf4844">
    <div>
        {#each DIFFICULTY as difficulty}
            <CourseEditor {difficulty} bind:course={courses[difficulty]} />
        {/each}
    </div>
</TitledContainer>

<style>
    div {
        width: 100%;
        border-collapse: collapse;
    }
</style>
