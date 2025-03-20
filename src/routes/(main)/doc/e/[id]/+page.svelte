<script lang="ts">
    import { page } from "$app/state";
    import DocEditor from "$lib/components/page/wikidoc/edit/DocEditor.svelte";
    import DocSubmit from "$lib/components/page/wikidoc/edit/DocSubmit.svelte";
    import { docContext } from "$lib/module/common/wikidoc/util";

    let { data } = $props();
    let wikiDoc = $state(data.docData);

    docContext.defineWikiDocURLBase(
        (() => {
            const base = new URL(page.url);
            base.pathname = "/doc/r";
            return base;
        })(),
    );
</script>

<DocEditor {wikiDoc} />
<DocSubmit {wikiDoc} type="update" />
