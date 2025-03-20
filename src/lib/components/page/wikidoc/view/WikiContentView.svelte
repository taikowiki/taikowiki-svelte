<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import Loading from "$lib/components/common/Loading.svelte";
    import type { Doc } from "$lib/module/common/wikidoc/types";
    import { wikiContext } from "$lib/module/common/wikidoc/util";
    import WikiParagraphView from "./WikiParagraphView.svelte";

    interface Props {
        contentTree: Doc.Data.WikiContentTree
    }

    let { contentTree }: Props = $props();
    let wikiElementsDefined = new Promise<void>(async (res) => {
        if (browser) {
            if (customElements.get("wiki-link")) {
                return res();
            }
            const { defineWikiElements } = await import(
                "$lib/module/common/wikidoc/client/wikiElements.client"
            );
            defineWikiElements();
            res();
        } else {
            res();
        }
    });

    wikiContext.defineWikiDocURLBase(
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
        {@html contentTree.content}
        {#each contentTree.subParagraphs as subParagraph, index}
            <WikiParagraphView paragraph={subParagraph} index={`${index + 1}`} />
        {/each}
    {/await}
{/key}
