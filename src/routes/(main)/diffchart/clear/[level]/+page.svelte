<script lang="ts">
    import Diffchart from "$lib/components/page/diffchart/Diffchart.svelte";
    import { loadAllSongs } from "$lib/module/common/song/song.client";

    export let data;
    const diffChart = data.diffChart;

    let downloadImage: (() => Promise<void>) | null;
</script>

{#if diffChart}
    {#if downloadImage}
        <button on:click={downloadImage}> 다운로드 </button>
    {/if}
    {#await loadAllSongs() then songs}
        <Diffchart
            {diffChart}
            {songs}
            backgroundColor="#c9c9c9"
            bind:downloadImage
        />
    {/await}
{/if}
