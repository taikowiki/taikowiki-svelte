<script lang="ts">
    import { page } from "$app/state";
    import DocEditor from "$lib/components/page/wikidoc/edit/DocEditor.svelte";
    import DocSubmit from "$lib/components/page/wikidoc/edit/DocSubmit.svelte";
    import { createDefaultDocData, docContext } from "$lib/module/common/wikidoc/util";

    let wikiDoc = $state(createDefaultDocData());
    docContext.defineWikiDocURLBase(
        (() => {
            const base = new URL(page.url);
            base.pathname = "/doc/r";
            return base;
        })(),
    );
    const title = page.url.searchParams.get('title');
    if(title){
        wikiDoc.title = title;
    }
</script>

<DocEditor {wikiDoc} />
<DocSubmit {wikiDoc} />
