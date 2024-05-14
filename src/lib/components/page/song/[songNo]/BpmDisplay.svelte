<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";
    import DisplayContainer from "./DisplayContainer.svelte";

    export let bpm: SongData["bpm"];
    export let bpmShiver: 1 | 0;
</script>

<DisplayContainer>
    <svelte:fragment slot="title">BPM</svelte:fragment>
    <svelte:fragment slot="content">
        {#if bpm.min === bpm.max}
            {bpm.min}
        {:else}
            {bpm.min} - {bpm.max}
        {/if}
        {#if Boolean(bpmShiver)}
            ※
        {/if}
    </svelte:fragment>
</DisplayContainer>
