<script lang="ts">
    import { goto } from "$app/navigation";
    import PageSelector from "$lib/components/common/PageSelector.svelte";
    import AdminPollList from "$lib/components/page/admin/poll/AdminPollList.svelte";

    let { data } = $props();
</script>

<AdminPollList polls={data.polls} />
<PageSelector
    pageNum={data.page}
    length={data.length}
    movePage={(page) => goto(`/admin/poll/list/${page}`)}
/>
