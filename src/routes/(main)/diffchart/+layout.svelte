<script lang="ts">
    import DiffchartSelectorMobile from "$lib/components/page/diffchart/DiffchartSelector-mobile.svelte";
    import DiffchartSelectorPc from "$lib/components/page/diffchart/DiffchartSelector-pc.svelte";
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";
    import { setContext } from "svelte";
    import { writable } from "svelte/store";
    import { navigating } from "$app/state";
    import MobileDefaultAd from "$lib/components/layout/ads/MobileDefaultAd.svelte";

    let { children } = $props();

    const downloadImage = writable<(() => any) | null>(null);
    setContext("downloadImage", downloadImage);

    const [theme] = getTheme();

    const isMobile = getIsMobile();

    const lang = getLang();
    let i18n = $derived(getI18N("/diffchart", $lang));
</script>

<PageAside>
    <DiffchartSelectorPc />
    {#if $downloadImage}
        <button
            style="cursor: pointer;display:flex;align-items:center;column-gap:5px;padding: 0;border: none;background: none;"
            onclick={$downloadImage}
        >
            <span class="download-text" data-theme={$theme}
                >{i18n.download}</span
            >
            <img
                class="download"
                data-theme={$theme}
                src="/assets/icon/download.svg"
                alt="다운로드"
                role="presentation"
            />
        </button>
    {/if}
</PageAside>

{#if $isMobile}
    <div class="mobile">
        <DiffchartSelectorMobile />
        {#if $downloadImage}
            <button
                onclick={$downloadImage}
                style="cursor: pointer;display:flex;align-items:center;column-gap:5px;padding: 0;border: none;background: none;"
            >
                <span class="download-text" data-theme={$theme}
                    >{i18n.download}</span
                >
                <img
                    class="download"
                    data-theme={$theme}
                    src="/assets/icon/download.svg"
                    alt="다운로드"
                    role="presentation"
                />
            </button>
        {/if}
    </div>
{/if}

{#key navigating}
    {#if !navigating.to}
        <MobileDefaultAd />
    {/if}
{/key}
{@render children?.()}

<style>
    .mobile {
        width: 100%;
        min-height: 30px;

        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 5px;
        margin-bottom: 10px;
        justify-content: space-between;
    }

    .download {
        width: 25px;
        height: 25px;
        cursor: pointer;
    }
    .download[data-theme="dark"] {
        filter: brightness(0) invert(100%);
    }

    .download-text {
        font-family: "Noto Sans KR", "Noto Sans JP";
        font-weight: 700;
        color: #cf4844;
    }
    .download-text[data-theme="dark"] {
        color: white;
    }
</style>
