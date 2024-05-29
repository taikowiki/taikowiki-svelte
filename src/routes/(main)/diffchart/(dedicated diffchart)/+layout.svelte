<script lang="ts">
    import { page } from "$app/stores";
    import DiffchartSelectorMobile from "$lib/components/layout/dedicated diffchart/DiffchartSelector-mobile.svelte";
    import DiffchartSelectorPc from "$lib/components/layout/dedicated diffchart/DiffchartSelector-pc.svelte";
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";
    import { setContext } from "svelte";
    import { writable } from "svelte/store";

    const downloadImage = writable<(() => any) | null>(null);
    setContext("downloadImage", downloadImage);

    const [theme] = getTheme();

    const isMobile = getIsMobile();
</script>

<PageAside>
    <DiffchartSelectorPc />
    {#if $downloadImage}
        <button style="cursor: pointer;display:flex;align-items:center;column-gap:5px;padding: 0;border: none;background: none;" on:click={$downloadImage}>
            <div style="font-family: 'Noto Sans KR', 'Noto Sans JP';font-weight:700;color:#cf4844;">다운로드</div>
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
            <img
                class="download"
                data-theme={$theme}
                src="/assets/icon/download.svg"
                alt="다운로드"
                on:click={$downloadImage}
                role="presentation"
            />
        {/if}
    </div>
{/if}

<slot />

<style>
    .mobile {
        width: 100%;
        min-height: 30px;

        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 5px;

        margin-bottom: 10px;
    }

    .download {
        width: 25px;
        height: 25px;
    }
    .download[data-theme="dark"] {
        filter: invert(100%);
    }
</style>
