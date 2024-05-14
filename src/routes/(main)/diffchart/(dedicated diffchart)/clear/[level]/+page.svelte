<script lang="ts">
    import Loading from "$lib/components/common/Loading.svelte";
    import Diffchart from "$lib/components/page/diffchart/Diffchart.svelte";
    import { loadAllSongs } from "$lib/module/common/song/song.client";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    export let data;
    $: diffChart = data.diffChart;

    let downloadImage: (() => Promise<void>) | null = null;
    $: (getContext('downloadImage') as Writable<(() => Promise<void>) | null>).set(downloadImage)

    const lang = getLang();
    $:i18n = getI18N('/diffchart', $lang);
</script>

{#key diffChart}
    {#await loadAllSongs()}
        <Loading />
    {:then songs}
        <Diffchart
            {diffChart}
            {songs}
            subname={i18n.subname}
            backgroundColor="#c9c9c9"
            bind:downloadImage
        />
    {/await}
{/key}
