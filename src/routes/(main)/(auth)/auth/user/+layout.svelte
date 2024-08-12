<script>
    import AsideItem from "$lib/components/layout/main/AsideItem.svelte";
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
</script>

<PageAside title="유저">
    <a href="/auth/user">
        내 정보
    </a>
    <a href="/auth/user/donder">
        동더 데이터
    </a>
</PageAside>

<slot />
