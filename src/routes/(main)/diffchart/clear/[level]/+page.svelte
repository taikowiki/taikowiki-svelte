<script lang="ts">
    import Loading from "$lib/components/common/Loading.svelte";
import Diffchart from "$lib/components/page/diffchart/Diffchart.svelte";
    import { loadAllSongs } from "$lib/module/common/song/song.client";
    import { getTheme } from "$lib/module/layout/theme.js";

    export let data;
    const diffChart = data.diffChart;

    let downloadImage: (() => Promise<void>) | null;

    const [theme] = getTheme();
</script>

{#if diffChart}
    {#if downloadImage}
        <button on:click={downloadImage}> 다운로드 </button>
    {/if}
    {#await loadAllSongs()}
        <Loading/>
    {:then songs}
        <Diffchart
            {diffChart}
            {songs}
            subname = '🔴 개인차가 왕 큼&nbsp;&nbsp;&nbsp;🟢 초견 주의&nbsp;&nbsp;&nbsp;🟣 클리어에 비해 풀콤보가 왕 어려움'
            backgroundColor="#c9c9c9"
            bind:downloadImage
        />
    {/await}
{/if}
