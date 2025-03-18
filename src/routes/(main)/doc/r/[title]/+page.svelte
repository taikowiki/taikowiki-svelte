<script lang="ts">
    import WikiView from "$lib/components/page/wikidoc/view/WikiView.svelte";
    import type { WikiDocPageViewData } from "$lib/module/common/wikidoc/types/wikidoc.view.types.js";

    interface Props {}

    let { data } = $props();
    let docViewData = $derived(data.docViewData);

    console.log(data.docViewData);
</script>

{#if docViewData.isDeleted}
    곡 삭제됨 ㅗ
{:else}
    <WikiView docViewData={data.docViewData as WikiDocPageViewData} />
{/if}
