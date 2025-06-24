<script lang="ts">
    import { page } from "$app/stores";
    import DiffchartEditor from "$lib/components/common/diffchart/DIffchart-Editor.svelte";
    import Diffchart from "$lib/components/page/diffchart/Diffchart.svelte";
    import type { Diffchart as D } from "$lib/module/diffchart";
    import { getIsMobile } from "$lib/module/layout/isMobile.js";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    let { data } = $props();
    const { donderData, songs } = data;

    let diffChart: D.Diffchart = $state(getDiffchartFromHash());

    let downloadImage: (() => Promise<void>) | null = $state(null);
    $effect(() => {
        (
            getContext("downloadImage") as Writable<
                (() => Promise<void>) | null
            >
        ).set(downloadImage);
    });

    const isMobile = getIsMobile();
    let editorOpened = $state(false);

    function getDiffchartFromHash(): D.Diffchart {
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
            const json = atob(hash);
            const diffchart = JSON.parse(decodeURIComponent(json));
            return diffchart;
        } catch {
            return {
                name: "custom",
                color: "white",
                backgroundColor: "gray",
                sections: [],
            };
        }
    }
</script>

<Diffchart {diffChart} {donderData} {songs} bind:downloadImage />

{#if !$isMobile}
    <div class="editorContainer">
        <button
            class="editorOpened"
            onclick={() => {
                editorOpened = !editorOpened;
            }}
        >
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
