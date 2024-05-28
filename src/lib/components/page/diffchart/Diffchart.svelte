<script lang="ts" context="module">
    function parseSongScoreJSON(json: string): SongScore[] | null {
        try {
            let result = JSON.parse(json);
            if (Array.isArray(result)) {
                return result;
            }
            return null;
        } catch(err){
            console.log(err);
            return null;
        }
    }
</script>

<script lang="ts">
    import type {
        DiffChart,
        SongScore,
    } from "$lib/module/common/diffchart/types";
    import DiffchartName from "./DiffchartName.svelte";
    import DiffchartSection from "./DiffchartSection.svelte";
    import { getLang, getI18N } from "$lib/module/common/i18n/i18n";
    import type { SongData } from "$lib/module/common/song/types";
    import { afterUpdate } from "svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import { browser } from "$app/environment";
    import html2canvas from "html2canvas";

    export let diffChart: DiffChart;
    export let songs: SongData[];
    export let color: string | undefined = diffChart.color;
    export let backgroundColor: string | undefined = diffChart.backgroundColor;
    export let downloadImage: (() => Promise<void>) | null = null;
    export let subname: string = "";

    const lang = getLang();
    $: i18n = getI18N("/diffchart/clear/[level]", $lang);
    $: name = i18n[diffChart.name];

    const [theme] = getTheme();

    let replica: HTMLDivElement;
    afterUpdate(async () => {
        if (!browser) {
            return;
        }
        downloadImage = async () => {
            const canvas = await html2canvas(replica);
            const url = canvas.toDataURL();
            const a = document.createElement("a");
            a.setAttribute("download", "서열표.png");
            a.href = url;
            a.click();
            a.remove();
            canvas.remove();
        };
    });

    let userScoreDataJSON: string = "";
    $: userScoreData = parseSongScoreJSON(userScoreDataJSON);
</script>

<input
    type="text"
    on:change={(event) => {
        userScoreDataJSON = event.currentTarget.value;
    }}
    id="scoredata_input"
    style="display:none;"
/>
<div class="container">
    <DiffchartName {name} {color} {backgroundColor} {subname} />
    {#each diffChart.sections.toSorted((a, b) => a.order - b.order) as section}
        <DiffchartSection {section} {songs} theme={$theme} {userScoreData}/>
    {/each}
</div>

<div class="replica" bind:this={replica}>
    <DiffchartName {name} {color} {backgroundColor} />
    {#each diffChart.sections.toSorted((a, b) => a.order - b.order) as section}
        <DiffchartSection {section} {songs} theme={"light"} useMobile={false} {userScoreData}/>
    {/each}
</div>

<style>
    .container {
        width: 100%;

        display: flex;
        flex-direction: column;
    }

    .replica {
        width: 1200px;
        position: absolute;

        background-color: white;

        top: 0;
        left: 0;

        transform: translateX(-100%);
    }
</style>
