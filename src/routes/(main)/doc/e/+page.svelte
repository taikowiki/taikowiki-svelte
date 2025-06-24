<script lang="ts">
    import { goto, replaceState } from "$app/navigation";
    import { page } from "$app/state";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import DocEditor from "$lib/components/page/wikidoc/edit/DocEditor.svelte";
    import DocSubmit from "$lib/components/page/wikidoc/edit/DocSubmit.svelte";
    import { Doc } from "$lib/module/doc/index.js";
    import { onMount, tick } from "svelte";

    const { createDefaultDocData, docContext } = Doc;

    let { data } = $props();
    onMount(async () => {
        await tick();
        if (data.redirect) {
            goto(`/doc/e/${data.redirect}`, { replaceState: true });
        }
    });

    let wikiDoc = $state(createDefaultDocData());
    docContext.defineWikiDocURLBase(
        (() => {
            const base = new URL(page.url);
            base.pathname = "/doc/r";
            return base;
        })(),
    );
    const title = page.url.searchParams.get("title");
    if (title) {
        wikiDoc.title = title;
    }
</script>

<PageTitle title="문서 작성" />
<DocEditor {wikiDoc} />
<DocSubmit {wikiDoc} />
