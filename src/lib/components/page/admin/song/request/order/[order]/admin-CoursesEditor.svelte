<script lang="ts">
    import TitledContainer from "$lib/components/common/TitledContainer.svelte";
    import CourseEditor from "./admin-CourseEditor.svelte";
    import { Song } from "$lib/module/song";

    const { DIFFICULTY } = Song.CONST;

    interface Props {
        courses: Song.SongData["courses"];
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
