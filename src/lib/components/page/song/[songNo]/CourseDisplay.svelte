<script lang="ts">
    import type { Course, Difficulty } from "$lib/module/common/song/types";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import CourseDisplayMobile from "./CourseDisplay-mobile.svelte";
    import CourseDisplayPc from "./CourseDisplay-pc.svelte";
    import color from "$lib/module/common/color";

    //export let difficulty: Difficulty;
    export let course: Course | undefined;

    const isMobile = getIsMobile();
</script>

{#if course}
    <!--
        <div class="border" style={`border-color:${color.difficulty[difficulty]};`}>
        
    </div>
    -->
    {#if $isMobile}
        <CourseDisplayMobile {course} />
    {:else}
        <CourseDisplayPc {course} />
    {/if}
{/if}

<style>
    /*.border {
        flex: 1 1 auto;
        display: flex;

        box-sizing: border-box;
        border: 2px solid;
    }*/
</style>
