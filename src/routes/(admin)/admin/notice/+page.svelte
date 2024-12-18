<script>
    import AdminNoticeList from "$lib/components/page/admin/notice/AdminNoticeList.svelte";

    let {data} = $props();
</script>

<a href="/admin/notice/write">
작성하기
</a>
<AdminNoticeList notices={data.notices} />