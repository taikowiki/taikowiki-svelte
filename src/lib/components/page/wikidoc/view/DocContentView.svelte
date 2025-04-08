<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import Loading from "$lib/components/common/Loading.svelte";
    import type { Doc } from "$lib/module/common/wikidoc/types";
    import { docContext } from "$lib/module/common/wikidoc/util";
    import { getTheme } from "$lib/module/layout/theme";
    import DocParagraphView from "./DocParagraphView.svelte";
    import '$lib/module/common/wikidoc/assets/docview.scss';
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    interface Props {
        contentTree: Doc.Data.ContentTree;
    }

    let { contentTree }: Props = $props();

    // 위키 커스텀 element 정의
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

    // 문서 로딩 확인용
    let docReady = getContext('docReady') as Writable<boolean>;
    wikiElementsDefined.then(() => {
        docReady.set(true);
    })

    docContext.defineWikiDocURLBase(
        (() => {
            const base = new URL(page.url);
            base.pathname = "/doc/r";
            return base;
        })(),
    );

    const [theme] = getTheme();
    const isMobile = getIsMobile();
</script>

{#key browser}
    {#await wikiElementsDefined}
        <Loading />
    {:then}
        <div class="doc-view-container" data-theme={$theme} data-isMobile={$isMobile}>
            <div class="doc-view-content">
                {@html contentTree.content}
            </div>
            {#each contentTree.subParagraphs as subParagraph, index}
                <DocParagraphView
                    paragraph={subParagraph}
                    index={`${index + 1}`}
                />
            {/each}
        </div>
    {/await}
{/key}