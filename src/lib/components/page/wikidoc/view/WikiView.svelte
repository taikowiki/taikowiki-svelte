<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import Loading from "$lib/components/common/Loading.svelte";
    import type { WikiDocPageViewData } from "$lib/module/common/wikidoc/types/wikidoc.view.types";
    import {
        defineWikiDocURLBase,
        getWindowContext,
    } from "$lib/module/common/wikidoc/util";
    import { onMount } from "svelte";

    interface Props {
        docViewData: WikiDocPageViewData;
    }

    let { docViewData }: Props = $props();
    let wikiElementsDefined = new Promise<void>(async (res) => {
        if (browser) {
            if (customElements.get("wiki-link")) {
                return res();
            }
            const { defineWikiElements } = await import(
                "$lib/module/common/wikidoc/wikiElements.client"
            );
            defineWikiElements();
            res();
        } else {
            res();
        }
    });

    defineWikiDocURLBase(
        (() => {
            const base = new URL(page.url);
            base.pathname = "/doc/r";
            return base;
        })(),
    );
</script>

{#key browser}
    {#await wikiElementsDefined}
        <Loading />
    {:then}
        {@html docViewData.preparedContent.content}
    {/await}
{/key}
