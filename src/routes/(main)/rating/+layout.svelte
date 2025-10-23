<script lang="ts">
    import { page } from "$app/stores";
    import Loading from "$lib/components/common/Loading.svelte";
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import { getI18N, getLang } from "$lib/module/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";

    const isMobile = getIsMobile();
    const [theme] = getTheme();
    const lang = getLang();
    $: i18n = getI18N($lang).layout.rating;
</script>

<PageAside title={i18n.title}>
    <a href="/rating/me">{i18n.me}</a>
    <a href="/rating/ranking"> {i18n.ranking}</a>
    <a href="/rating/measure"> {i18n.measure}</a>
</PageAside>

{#if $isMobile}
    <nav class="standard">
        <a class="standard" data-theme={$theme} href="/rating/me">
            {i18n.me}
        </a>
        <a class="standard" data-theme={$theme} href="/rating/ranking">
            {i18n.ranking}
        </a>
        <a class="standard" data-theme={$theme} href="/rating/measure">
            {i18n.measure}
        </a>
    </nav>
{/if}

<slot />
