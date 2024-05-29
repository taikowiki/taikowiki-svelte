<script lang="ts" context="module">
    const sectionColor: Record<string, string> = {
        SSS: "#B93FEA",
        SS: "#E8348F",
        S: "#EF3059",
        A: "#EB7535",
        B: "#E6B439",
        C: "#60CE37",
        D: "#37B0CB",
        E: "#4161D8",
        X: "#adadad",
    };
</script>

<script lang="ts">
    import Diffchart from "$lib/components/page/diffchart/Diffchart.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    export let data;
    $: diffChart = data.diffChart;

    let downloadImage: (() => Promise<void>) | null = null;
    $: (
        getContext("downloadImage") as Writable<(() => Promise<void>) | null>
    ).set(downloadImage);

    const lang = getLang();
    $: i18n = getI18N("/diffchart/clear/[level]", $lang);
    $: diffChart.name = i18n[diffChart.name];
    $: diffChart.sections.forEach((section) => {
        section.backgroundColor = sectionColor[section.name];
        section.name = i18n.sections[section.name];
    });

    const songs = data.songs;
</script>

{#key diffChart}
    <Diffchart
        {diffChart}
        {songs}
        backgroundColor="#c9c9c9"
        bind:downloadImage
    />
{/key}
