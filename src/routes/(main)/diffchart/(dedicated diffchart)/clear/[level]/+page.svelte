<script lang="ts" module>
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

    function getCustomedDiffchart(diffChart: DiffChart, i18n: any) {
        const replica = JSON.parse(JSON.stringify(diffChart)) as DiffChart;

        replica.name = i18n[diffChart.name];
        replica.sections.forEach((section) => {
            section.backgroundColor = sectionColor[section.name];
            section.color = "white";
            section.name = i18n.sections[section.name];
        });

        return replica;
    }
</script>

<script lang="ts">
    import { page } from "$app/stores";
    import Diffchart from "$lib/components/page/diffchart/Diffchart.svelte";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import type { DiffChart } from "$lib/module/common/diffchart/types";

    let { data } = $props();
    const { songs, diffChartData } = data;

    let downloadImage: (() => Promise<void>) | null = $state(null);
    $effect(() => {
        (
            getContext("downloadImage") as Writable<
                (() => Promise<void>) | null
            >
        ).set(downloadImage);
    });

    const lang = getLang();
    let i18n = $derived(getI18N("/diffchart/clear/[level]", $lang));
    let titleI18n = $derived(getI18N("other", $lang).title["/diffchart/clear"]);
    let customedDiffchart = $derived(
        getCustomedDiffchart(diffChartData.data, i18n),
    );

    const donderData = data.donderData;
</script>

<PageTitle title={`★${$page.url.pathname.split("/")[3]} ${titleI18n}`} />

<Diffchart
    diffChart={customedDiffchart}
    {songs}
    {donderData}
    backgroundColor="#c9c9c9"
    bind:downloadImage
/>
{#if diffChartData.comment}
    <div class="comment-container">
        {@html diffChartData.comment}
    </div>
{/if}

<style>
    .comment-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
