<script lang="ts">
    import { page } from "$app/stores";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import NoticeList from "$lib/components/page/notice/NoticeList.svelte";
    import NoticePageSelector from "$lib/components/page/notice/NoticePageSelector.svelte";

    let {data} = $props();

    const pageNum = Number($page.url.searchParams.get("page")) || 1;
</script>

<PageTitle title="공지"/>
<h1>공지</h1>
<NoticeList notices={data.notices}/>
<NoticePageSelector {pageNum} length={data.count} />

<style>
    h1 {
        margin-block: 5px;
    }
</style>
