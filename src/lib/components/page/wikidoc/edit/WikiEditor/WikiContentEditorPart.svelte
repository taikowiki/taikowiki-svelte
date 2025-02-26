<script lang="ts">
    import type { WikiDocData } from "$lib/module/common/wikidoc/types/wikidoc.types";
    import WikiContentEditor from "./WikiContentEditor.svelte";

    interface Props{
        wikiDoc: WikiDocData;
    }

    let {wikiDoc = $bindable()}: Props = $props();
</script>

{#if wikiDoc.type === "normal" || wikiDoc.type === "song"}
    <WikiContentEditor bind:content={wikiDoc.contentTree.content} />
{/if}
