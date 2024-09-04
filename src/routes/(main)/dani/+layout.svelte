<script>
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import { page } from "$app/stores";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n.ts";
    import DaniSelector from "$lib/components/page/dani/DaniSelector.svelte";
    import { Row } from "$lib/components/common/styled";
    import { goto } from "$app/navigation";
    import { getIsMobile } from "$lib/module/layout/isMobile.ts";

    export let data;

    const { versions } = data;
    let version = $page.url.pathname.replace("/dani/", "") || "24";

    const isMobile = getIsMobile();
</script>

<PageAside>
    <Row.center>
        <DaniSelector {versions} bind:version />
        <button
            on:click={() => {
                goto(`/dani/${version}`);
            }}
        >
            이동
        </button>
    </Row.center>
</PageAside>

{#if $isMobile}
    <Row.left class="mobileNavigator" style=" margin-bottom: 10px;">
        <DaniSelector {versions} bind:version />
        <button
            on:click={() => {
                goto(`/dani/${version}`);
            }}
        >
            이동
        </button>
    </Row.left>
{/if}

<slot />

<style>
    button{
        height: 24px;
        box-sizing: border-box;
        margin-left: 6px;
    }
</style>