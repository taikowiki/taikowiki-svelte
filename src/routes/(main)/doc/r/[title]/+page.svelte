<script lang="ts">
    import WikiContentView from "$lib/components/page/wikidoc/view/WikiContentView.svelte";
    import WikiTitleView from "$lib/components/page/wikidoc/view/WikiTitleView.svelte";
    import type { WikiDocPageViewData } from "$lib/module/common/wikidoc/types/wikidoc.view.types.js";
    import { getTheme } from "$lib/module/layout/theme";
    import { DateTime } from "luxon";

    interface Props {}

    let { data } = $props();
    let docViewData = $derived(data.docViewData);

    const [theme] = getTheme();

    $inspect(data.docViewData);
</script>

<WikiTitleView {docViewData}/>
{#if docViewData.isDeleted}
    곡 삭제됨 ㅗ
{:else}
    <WikiContentView docViewData={data.docViewData as WikiDocPageViewData} />
{/if}
