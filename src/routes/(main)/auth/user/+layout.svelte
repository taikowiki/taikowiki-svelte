<script>
    import AsideItem from "$lib/components/layout/main/AsideItem.svelte";
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";

    const lang = getLang();
    $: i18n = getI18N('layout', $lang)['/auth/user']
</script>

<PageAside title="유저">
    <a href="/auth/user">
        {i18n.myData}
    </a>
    <a href="/auth/user/donder">
        {i18n.donderData}
    </a>
</PageAside>

<slot />
