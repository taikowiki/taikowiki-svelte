<script lang="ts">
    import { Song } from "$lib/module/song";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import CourseDisplayMobile from "./CourseDisplay-mobile.svelte";
    import CourseDisplayPc from "./CourseDisplay-pc.svelte";

    interface Props{
        course: Song.Course | null;
    }

    let {course}: Props = $props();

    const isMobile = getIsMobile();
</script>

{#if course !== null}
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
