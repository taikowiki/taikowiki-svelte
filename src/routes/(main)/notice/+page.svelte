<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import PageSelector from "$lib/components/common/PageSelector.svelte";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import NoticeList from "$lib/components/page/notice/NoticeList.svelte";

    let { data } = $props();

    const pageNum = Number($page.url.searchParams.get("page")) || 1;

    function movePage(p: number){
        const searchParam = new URLSearchParams(location.search);

        searchParam.set("page", p.toString());

        goto(`/notice?${searchParam}`);

        window.scrollTo({
            top: 0,
        });
    }
</script>

<PageTitle title="공지" />
<h1>공지</h1>
<NoticeList notices={data.notices} />
<PageSelector
    {pageNum}
    length={data.count}
    countPerPage={30}
    {movePage}
/>

<style>
    h1 {
        margin-block: 5px;
    }
</style>
