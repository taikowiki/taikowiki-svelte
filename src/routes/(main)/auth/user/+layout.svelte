<script>
    import { navigating, page } from "$app/stores";
    import Loading from "$lib/components/common/Loading.svelte";
    import { Row } from "$lib/components/common/styled";
    import AsideItem from "$lib/components/layout/main/AsideItem.svelte";
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    const lang = getLang();
    $: i18n = getI18N("layout", $lang)["/auth/user"];

    const isMobile = getIsMobile();

    $: console.log($page);
    $: console.log($navigating);
</script>

<PageAside title="유저">
    <a href="/auth/user">
        {i18n.myData}
    </a>
    <a href="/auth/user/donder">
        {i18n.donderData}
    </a>
</PageAside>

{#if $isMobile}
    <Row.left columnGap="5">
        <a href="/auth/user">
            {i18n.myData}
        </a>
        <a href="/auth/user/donder">
            {i18n.donderData}
        </a>
    </Row.left>
{/if}
<slot />
