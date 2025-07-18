<script lang="ts">
    import { page } from "$app/state";
    import DiffchartView from "$lib/components/page/diffchart/Diffchart.svelte";
    import Diffchart from "$lib/module/diffchart";
    import { getContext, onMount } from "svelte";
    import DiffchartEditor from "$lib/components/common/diffchart/DiffchartEditor.svelte";
    import type { Writable } from "svelte/store";
    import { getTheme } from "$lib/module/layout/theme";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import { browser } from "$app/environment";
    import { replaceState } from "$app/navigation";

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

    $effect(() => {
        if (browser && !page.url.hash) {
            window.localStorage.setItem(
                "latestEditingDiffchart",
                JSON.stringify(diffchart),
            );
        }
    });

    const { songs, donderData } = data;
    const [theme] = getTheme();

    function getDiffchart(): Diffchart.Diffchart {
        const hash = page.url.hash.slice(1);

        try {
            let diffchart: Diffchart.Diffchart;
            if (hash) {
                diffchart = Diffchart.decodeDiffchart(hash);
            } else {
                const latestEditingDiffchart = window.localStorage.getItem(
                    "latestEditingDiffchart",
                );
                if (latestEditingDiffchart) {
                    diffchart = JSON.parse(latestEditingDiffchart);
                } else {
                    diffchart = Diffchart.createEmptyDiffchart();
                }
            }
            Diffchart.Schema.Diffchart.parse(diffchart);
            return diffchart;
        } catch {
            return Diffchart.createEmptyDiffchart();
        }
    }
</script>

<PageTitle title={diffchart.name && diffchart.name !== "custom" ? diffchart.name : "커스텀 서열표"} />
<DiffchartView diffChart={diffchart} {songs} {donderData} bind:downloadImage />
<div class="margin"></div>
<button
    class="standard-btn"
    data-theme={$theme}
    onclick={() => (showEditor = !showEditor)}
>
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

    button {
        height: 25px;
        margin-bottom: 10px;
    }
</style>
