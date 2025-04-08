<script lang="ts">
    import { page } from "$app/state";
    import type { Doc } from "$lib/module/common/wikidoc/types";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    interface Props {
        contentTree: Doc.Data.PrerenderedContentTree;
    }

    let { contentTree }: Props = $props();

    let docReady = getContext("docReady") as Writable<boolean>;
    let gotoIndexCalled = $state(false);
    $effect(() => {
        if (gotoIndexCalled) return;
        if (!$docReady) return;
        const hash = page.url.hash;
        if (!hash) return;
        gotoIndex(hash.slice(1));
        gotoIndexCalled = true;
    });

    const isMobile = getIsMobile();
    const [theme] = getTheme();

    function gotoIndex(index: string) {
        const targetElement = document.querySelector(
            `[data-doc-index="${index}"]`,
        );
        if (!targetElement) return;

        targetElement.scrollIntoView();
    }
</script>

{#snippet paragraphView(paragraph: Doc.Data.DocParagraph, index: string)}
    <div class="paragraph-container">
        <div class="paragraph-title">
            <a href={`#${index}`} onclick={() => gotoIndex(index)}>{index}.</a>
            <span>{paragraph.title}</span>
        </div>
        <div class="subparagraph-container">
            {#each paragraph.subParagraphs as subParagraph, index_}
                {@render paragraphView(subParagraph, `${index}.${index_ + 1}`)}
            {/each}
        </div>
    </div>
{/snippet}

<div class="container" data-isMobile={$isMobile} data-theme={$theme}>
    {#each contentTree.subParagraphs as paragraph, index}
        {@render paragraphView(paragraph, (index + 1).toString())}
    {/each}
</div>

<style>
    .container {
        width: 100%;
        word-wrap: break-word;

        padding: 5px;
        box-sizing: border-box;

        &[data-isMobile="true"]{
            border: 1px solid #cf4844;
            margin-top: 20px;
            margin-bottom: 20px;
            border-radius: 5px;
        }
        &[data-theme="dark"]{
            border-color: #e1a743;
        }
    }

    .subparagraph-container{
        padding-left: 3px;
    }
</style>
