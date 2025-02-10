<script lang="ts">
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    let { children } = $props();

    const isMobile = getIsMobile();
    const lang = getLang();
    let i18n = $derived(getI18N($lang).layout.rating);
</script>

<PageAside title={i18n.title}>
    <a href="/rating/me">{i18n.me}</a>
    <a href="/rating/ranking"> {i18n.ranking}</a>
    <a href="/rating/measure"> {i18n.measure}</a>
</PageAside>

{#if $isMobile}
    <div class="left">
        <a href="/rating/me">
            {i18n.me}
        </a>
        <a href="/rating/ranking">
            {i18n.ranking}
        </a>
        <a href="/rating/measure">
            {i18n.measure}
        </a>
    </div>
{/if}

{@render children?.()}

<style>
    .left {
        display: flex;
        column-gap: 10px;
        flex-wrap: wrap;

        margin-bottom: 10px;
    }
</style>
