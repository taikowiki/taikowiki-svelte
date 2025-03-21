<script lang="ts">
    import { renderer } from "$lib/module/common/wikidoc/util";
    import { defineWikiElements, isDefined } from "$lib/module/common/wikidoc/client/wikiElements.client";
    import { getTheme } from "$lib/module/layout/theme";
    import { docContext } from "$lib/module/common/wikidoc/util";
    import '$lib/module/common/wikidoc/assets/docview.scss';

    /*
    import { getWindowContext } from "$lib/module/common/util.client";
    import { renderAnnotation, renderFrame, renderWikiDoc } from "$lib/module/common/wikidoc/wikidoc";
    import { defineWikiElements } from "$lib/module/common/wikidoc/wikidoc.client";
    */

    interface Props {
        content: string;
    }

    let { content }: Props = $props();

    if(!isDefined()){
        defineWikiElements();
    }
    docContext.resetWikiDocAnnotations();
    let convertedContentPromise = $derived(renderer.renderPreviewHTML(content));

    const [theme] = getTheme();
</script>

<div class="doc-view-container" data-theme={$theme}>
    {#await convertedContentPromise then convertedContent}
        {#key $theme}
            {@html convertedContent}
        {/key}
    {/await}
</div>

<style>
    .doc-view-container {
        width: 100%;
        min-height: 500px;
        border: 2px solid black;
    }
</style>
