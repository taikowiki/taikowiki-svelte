<script lang="ts">
    import DocRedirectFrom from "$lib/components/page/wikidoc/view/DocRedirectFrom.svelte";
    import DocContentView from "$lib/components/page/wikidoc/view/DocContentView.svelte";
    import DocTitleView from "$lib/components/page/wikidoc/view/DocTitleView.svelte";

    let { data } = $props();
    let docData = $state(data.docData);
    let { canEditable } = data;

    //$inspect(data.docViewData);
</script>

<DocRedirectFrom />
<DocTitleView
    id={docData.id}
    title={docData.title}
    editedTime={docData.editedTime}
    {canEditable}
/>
{#if docData.isDeleted}
    이 문서는 삭제되었습니다.
{:else}
    <DocContentView contentTree={docData.contentTree} />
{/if}
