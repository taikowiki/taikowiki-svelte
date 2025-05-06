<script lang="ts">
    import DocRedirectFrom from "$lib/components/page/wikidoc/view/DocRedirectFrom.svelte";
    import DocContentView from "$lib/components/page/wikidoc/view/DocContentView.svelte";
    import DocTitleView from "$lib/components/page/wikidoc/view/DocTitleView.svelte";
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import DocIndex from "$lib/components/page/wikidoc/view/DocIndex.svelte";
    import { setContext } from "svelte";
    import { writable } from "svelte/store";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import PageTitle from "$lib/components/common/PageTitle.svelte";

    let { data } = $props();
    let docData = $state(data.docData);
    let { canEditable } = data;

    const isMobile = getIsMobile();

    setContext("docReady", writable(false));

    //$inspect(data.docViewData);
</script>

<PageTitle title={data.docData.title}/>
<DocRedirectFrom />
<DocTitleView
    id={docData.id}
    title={docData.title}
    editedTime={docData.editedTime}
    {canEditable}
/>
{#if docData.isDeleted}
    이 문서는 삭제되었습니다.
{:else if docData.contentTree}
    {#if docData.contentTree.subParagraphs.length > 0}
        <PageAside>
            <DocIndex contentTree={docData.contentTree} />
        </PageAside>
        {#if $isMobile}
            <DocIndex contentTree={docData.contentTree} />
        {/if}
    {/if}
    <DocContentView contentTree={docData.contentTree} />
{/if}
