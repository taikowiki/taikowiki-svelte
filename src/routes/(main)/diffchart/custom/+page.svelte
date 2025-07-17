<script lang="ts">
    import { page } from "$app/state";
    import DiffchartView from "$lib/components/page/diffchart/Diffchart.svelte";
    import Diffchart from "$lib/module/diffchart";
    import { getContext } from "svelte";
    import DiffchartEditor from "$lib/components/common/diffchart/DiffchartEditor.svelte";
    import type { Writable } from "svelte/store";
    import { getTheme } from "$lib/module/layout/theme";
    import PageTitle from "$lib/components/common/PageTitle.svelte";

    let { data } = $props();
    let diffchart = $state(getDiffchart());
    let showEditor = $state(false);
    let downloadImage: (() => Promise<void>) | null = $state(null);
    $effect.pre(() => {
        (
            getContext("downloadImage") as Writable<
                (() => Promise<void>) | null
            >
        ).set(downloadImage);
    });

    const { songs, donderData } = data;
    const [theme] = getTheme();

    function getDiffchart() {
        const hash = page.url.hash.slice(1);

        try {
            if (hash) {
                return Diffchart.decodeDiffchart(hash);
            } else {
                return Diffchart.createEmptyDiffchart();
            }
        } catch {
            return Diffchart.createEmptyDiffchart();
        }
    }
</script>

<PageTitle title={diffchart.title ?? '커스텀 서열표'}/>
<DiffchartView diffChart={diffchart} {songs} {donderData} bind:downloadImage />
<div class="margin"></div>
<button class="standard-btn" data-theme={$theme} onclick={() => showEditor = !showEditor}>
    {#if showEditor}
        에디터 닫기
    {:else}
        에디터 열기
    {/if}
</button>
{#if showEditor}
    <DiffchartEditor bind:diffchart {songs} canCopyUrl={true} />
{/if}

<style>
    .margin {
        margin-top: 20px;
    }

    button{
        height: 25px;
        margin-bottom: 10px;
    }
</style>
