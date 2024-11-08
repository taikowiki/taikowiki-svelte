<script lang="ts">
    import { page } from "$app/stores";
    import DiffchartEditor from "$lib/components/common/diffchart/DIffchart-Editor.svelte";
    import Diffchart from "$lib/components/page/diffchart/Diffchart.svelte";
    import type { DiffChart } from "$lib/module/common/diffchart/types";
    import { getIsMobile } from "$lib/module/layout/isMobile.js";
    import LZUTF8 from "lzutf8";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    export let data;
    const { donderData, songs } = data;

    let diffChart: DiffChart = getDiffchartFromHash();

    let downloadImage: (() => Promise<void>) | null = null;
    $: (
        getContext("downloadImage") as Writable<(() => Promise<void>) | null>
    ).set(downloadImage);

    const isMobile = getIsMobile();
    let editorOpened = false;

    function getDiffchartFromHash(): DiffChart {
        let hash = $page.url.hash;
        if (hash.length === 0) {
            return {
                name: "custom",
                color: "white",
                backgroundColor: "gray",
                sections: [],
            };
        }

        hash = hash.slice(1, hash.length);
        if (hash.length === 0) {
            return {
                name: "custom",
                color: "white",
                backgroundColor: "gray",
                sections: [],
            };
        }

        try {
            const stringifiedCompressed = decodeURIComponent(atob(hash));
            const compressed = Uint8Array.from(JSON.parse(stringifiedCompressed));
            const stringified = LZUTF8.decompress(compressed);
            const diffchart = JSON.parse(stringified);
            return diffchart;
        } catch {
            try{
                const diffchart = JSON.parse(decodeURIComponent(atob(hash)));
                return diffchart;
            }
            catch{
                return {
                name: "custom",
                color: "white",
                backgroundColor: "gray",
                sections: [],
            };
            }
        }
    }
</script>

<Diffchart {diffChart} {donderData} {songs} bind:downloadImage />

{#if !$isMobile}
    <div class="editorContainer">
        <button class="editorOpened" on:click={() => {editorOpened = !editorOpened}}>
            {#if editorOpened}
                에디터 닫기
            {:else}
                에디터 열기
            {/if}
        </button>
        {#if editorOpened}
            <DiffchartEditor bind:diffchart={diffChart} />
        {/if}
    </div>
{/if}

<style>
    .editorContainer {
        margin-top: 30px;
    }
</style>
