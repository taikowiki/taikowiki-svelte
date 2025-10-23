<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import PageSelector from "$lib/components/common/PageSelector.svelte";
    import PollList from "$lib/components/page/poll/PollList.svelte";

    let { data } = $props();
</script>

<PollList polls={data.closedPolls} answers={data.answers} closed={true} />

<PageSelector
    pageNum={Number(page.params.page)}
    length={data.length}
    movePage={(p) => goto(`/poll/closed/${p}`)}
/>
