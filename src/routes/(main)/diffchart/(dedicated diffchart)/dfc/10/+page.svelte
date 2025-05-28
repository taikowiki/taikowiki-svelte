<script lang="ts" module>
    const sectionColor: Record<string, string> = {
        'SS': "#B93FEA",
        'pS+': "#f00eac",
        'iS': "#ff0000",
        'pS': "#ff0000",
        'iA+': '#EF3059',
        'pA+': '#EF3059',
        'iA': "#ef3030",
        'pA': "#ef3030",
        'iB': "#EB7535",
        'pB': "#EB7535",
        'iC': '#60CE37',
        'pC': '#60CE37',
        'iD': '#37B0CB',
        'pD': '#37B0CB',
        'iE': '#4161D8',
        'pE': '#4161D8',
        'iF': '#adadad'
    };

    function getCustomedDiffchart(diffChart: D.Diffchart, i18n: any) {
        const replica = JSON.parse(JSON.stringify(diffChart)) as D.Diffchart;

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
    import type { Diffchart as D } from "$lib/module/diffchart";

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
    let i18n = $derived(getI18N($lang).page.diffchart.dfc);
    let titleI18n = $derived(getI18N($lang).title["/diffchart/dfc"]);
    let customedDiffchart = $derived(getCustomedDiffchart(diffChartData.data, i18n));


    const donderData = data.donderData;
</script>

<PageTitle title={`★${$page.url.pathname.split("/")[3]} ${titleI18n}`} />

<Diffchart
    diffChart={customedDiffchart}
    {songs}
    {donderData}
    backgroundColor="linear-gradient(90deg, rgba(255,67,118,1) 0%, rgba(255,244,86,1) 34%, rgba(103,221,255,1) 73%, rgba(179,114,255,1) 100%)"
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
