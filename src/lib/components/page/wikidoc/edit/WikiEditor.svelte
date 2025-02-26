<script lang="ts">
    import type { WikiDocData } from "$lib/module/common/wikidoc/types/wikidoc.types";
    import WikiTypeSelector from "./WikiEditor/WikiTypeSelector.svelte";
    import WikiTitleEditor from "./WikiEditor/WikiTitleEditor.svelte";
    import WikiSubparagraphEditorPart from "./WikiEditor/WikiSubparagraphEditorPart.svelte";
    import WikiContentEditorPart from "./WikiEditor/WikiContentEditorPart.svelte";

    interface Props{
        wikiDoc: WikiDocData;
    }

    let {wikiDoc = $bindable()}: Props = $props();
</script>

<!-- svelte-ignore ownership_invalid_mutation -->
<!-- svelte-ignore ownership_invalid_binding -->

<div class="container">
    <WikiTitleEditor bind:title={wikiDoc.title} />
    <WikiTypeSelector bind:wikiDoc />
    <WikiContentEditorPart bind:wikiDoc/>
    <WikiSubparagraphEditorPart bind:wikiDoc />
</div>

<style>
    .container {
        width: 100%;
    }
</style>