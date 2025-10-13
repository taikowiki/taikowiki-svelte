<script>
    import { navigating, page } from "$app/stores";
    import Loading from "$lib/components/common/Loading.svelte";
    import { Row } from "$lib/components/common/styled";
    import AsideItem from "$lib/components/layout/main/AsideItem.svelte";
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import { getI18N, getLang } from "$lib/module/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";

    const lang = getLang();
    $: i18n = getI18N("layout", $lang)["/auth/user"];

    const [theme] = getTheme();
    const isMobile = getIsMobile();
</script>

<PageAside title={i18n.user}>
    <a href="/auth/user">
        {i18n.myData}
    </a>
    <a href="/rating">
        {i18n.donderData}
    </a>
</PageAside>

{#if $isMobile}
    <nav class="standard">
        <a class="standard" href="/auth/user" data-theme={$theme}>
            {i18n.myData}
        </a>
        <a class="standard" href="/rating" data-theme={$theme}>
            {i18n.donderData}
        </a>
    </nav>
{/if}
<slot />