<script lang="ts" module>
    const sectionColor: Record<string, string> = {
        'SS': "#B93FEA",
        'S+': "#f00eac",
        'pS+': "#f00eac",
        'S': "#ff0000",
        'pS': "#ff0000",
        'A+': '#EF3059',
        'pA+': '#EF3059',
        'A': "#ef3030",
        'pA': "#ef3030",
        'B+': '#ff5a00',
        'B': "#EB7535",
        'pB': "#EB7535",
        'C+': '#E6B439',
        'C': '#60CE37',
        'pC': '#60CE37',
        'D': '#37B0CB',
        'E': '#4161D8',
        'F': '#adadad'
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
    let i18n = $derived(getI18N($lang).page.diffchart.fc);
    let titleI18n = $derived(getI18N("other", $lang).title["/diffchart/fc"]);
    let customedDiffchart = $derived(getCustomedDiffchart(diffChartData.data, i18n));


    const donderData = data.donderData;
</script>

<PageTitle title={`★${$page.url.pathname.split('/')[3]} ${titleI18n}`}/>

<Diffchart
    diffChart={customedDiffchart}
    {songs}
    {donderData}
    backgroundColor="#ffd055"
    bind:downloadImage
/>
{#if diffChartData.comment}
    <div class="comment-container">
        {@html diffChartData.comment}
    </div>
{/if}

<style>
    .comment-container{
        display:flex;
        flex-direction: column;
        align-items: center;
    }
</style>