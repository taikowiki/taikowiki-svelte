<script lang="ts">
    import { page } from "$app/stores";
    import Loading from "$lib/components/common/Loading.svelte";
import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import { getI18N, getLang } from "$lib/module/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    const isMobile = getIsMobile();
    const lang = getLang();
    $: i18n = getI18N($lang).layout.rating;
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

<slot />

<style>
    .left {
        display: flex;
        column-gap: 10px;
        flex-wrap: wrap;

        margin-bottom: 10px;
    }
</style>
