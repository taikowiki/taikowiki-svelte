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

    export let data;

    let downloadImage: (() => Promise<void>) | null = null;
    $: (
        getContext("downloadImage") as Writable<(() => Promise<void>) | null>
    ).set(downloadImage);

    const lang = getLang();
    $: i18n = getI18N("/diffchart/clear/[level]", $lang);
    $: titleI18n = getI18N('other', $lang).title['/diffchart/clear'];
    $: customedDiffchart = getCustomedDiffchart(data.diffChart, i18n);

    const songs = data.songs;
    const donderData = data.donderData;
</script>

<PageTitle title={`★${$page.url.pathname.split('/')[3]} ${titleI18n}`}/>

<Diffchart
    diffChart={customedDiffchart}
    {songs}
    {donderData}
    backgroundColor="#c9c9c9"
    bind:downloadImage
/>
