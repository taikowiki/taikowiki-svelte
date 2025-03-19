<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import Loading from "$lib/components/common/Loading.svelte";
    import type { Doc } from "$lib/module/common/wikidoc/types";
    import { defineWikiDocURLBase } from "$lib/module/common/wikidoc/util";
    import WikiParagraphView from "./WikiParagraphView.svelte";

    interface Props {
        docViewData: Doc.View.Page.ViewData;
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
        {#each docViewData.preparedContent.subParagraphs as subParagraph, index}
            <WikiParagraphView paragraph={subParagraph} index={`${index + 1}`} />
        {/each}
    {/await}
{/key}
