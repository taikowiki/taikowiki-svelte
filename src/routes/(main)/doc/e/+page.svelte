<script lang="ts">
    import { page } from "$app/state";
    import WikiEditor from "$lib/components/page/wikidoc/edit/WikiEditor.svelte";
    import { createDefaultDocData } from "$lib/module/common/wikidoc/util";
    import { defineWikiDocURLBase } from "$lib/module/common/wikidoc/util.client";

    let wikiDoc = $state(createDefaultDocData());
    defineWikiDocURLBase((() => {
        const base = new URL(page.url);
        base.pathname = "/doc/r";
        return base;
    })())
</script>

<WikiEditor {wikiDoc} />
