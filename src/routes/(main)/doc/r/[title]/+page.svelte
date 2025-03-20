<script lang="ts">
    import DocRedirectFrom from "$lib/components/page/wikidoc/view/DocRedirectFrom.svelte";
    import WikiContentView from "$lib/components/page/wikidoc/view/WikiContentView.svelte";
    import WikiTitleView from "$lib/components/page/wikidoc/view/WikiTitleView.svelte";

    let { data } = $props();
    let docData = $state(data.docData);
    let { canEditable } = data;

    //$inspect(data.docViewData);
</script>

<DocRedirectFrom />
<WikiTitleView
    id={docData.id}
    title={docData.title}
    editedTime={docData.editedTime}
    {canEditable}
/>
{#if docData.isDeleted}
    이 문서는 삭제되었습니다.
{:else}
    <WikiContentView contentTree={docData.contentTree} />
{/if}
