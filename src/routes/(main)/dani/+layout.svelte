<script>
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import { page } from "$app/stores";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n.ts";
    import DaniSelector from "$lib/components/page/dani/DaniSelector.svelte";
    import { Row } from "$lib/components/common/styled";
    import { goto } from "$app/navigation";
    import { getIsMobile } from "$lib/module/layout/isMobile.ts";

    let {data, children} = $props();

    const { versions } = data;
    let version = $state($page.url.pathname.replace("/dani/", "") || "24");

    const isMobile = getIsMobile();

    const lang = getLang()
    let go = $derived(getI18N($lang).page.dani.go)
</script>

<PageAside>
    <Row.center>
        <DaniSelector {versions} bind:version />
        <button
            onclick={() => {
                goto(`/dani/${version}`);
            }}
        >
            {go}
        </button>
    </Row.center>
</PageAside>

{#if $isMobile}
    <Row.left class="mobileNavigator" style=" margin-bottom: 10px;">
        <DaniSelector {versions} bind:version />
        <button
            onclick={() => {
                goto(`/dani/${version}`);
            }}
        >
            이동
        </button>
    </Row.left>
{/if}

{@render children?.()}

<style>
    button{
        height: 24px;
        box-sizing: border-box;
        margin-left: 6px;
    }
</style>