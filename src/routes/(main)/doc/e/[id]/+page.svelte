<script lang="ts">
    import { page } from "$app/state";
    import WikiEditor from "$lib/components/page/wikidoc/edit/WikiEditor.svelte";
    import WikiSubmit from "$lib/components/page/wikidoc/edit/WikiSubmit.svelte";
    import { defineWikiDocURLBase } from "$lib/module/common/wikidoc/util";

    let { data } = $props();
    let wikiDoc = $state(data.docData);

    defineWikiDocURLBase(
        (() => {
            const base = new URL(page.url);
            base.pathname = "/doc/r";
            return base;
        })(),
    );
</script>

<WikiEditor {wikiDoc} />
<WikiSubmit {wikiDoc} type="update" />
