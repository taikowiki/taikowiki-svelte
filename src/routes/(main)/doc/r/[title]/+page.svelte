<script lang="ts">
    import WikiContentView from "$lib/components/page/wikidoc/view/WikiContentView.svelte";
    import WikiTitleView from "$lib/components/page/wikidoc/view/WikiTitleView.svelte";
    import type { Doc } from "$lib/module/common/wikidoc/types";

    interface Props {}

    let { data } = $props();
    let docViewData = $derived(data.docViewData);

    //$inspect(data.docViewData);
</script>

<WikiTitleView {docViewData} />
{#if docViewData.isDeleted}
    이 문서는 삭제되었습니다.
{:else}
    <WikiContentView docViewData={data.docViewData as Doc.View.Page.ViewData} />
{/if}
