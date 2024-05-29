<script lang="ts">
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
        <div style="display:flex;align-items:center;column-gap:5px;">
            다운로드
            <img
                class="download"
                data-theme={$theme}
                src="/assets/icon/download.svg"
                alt="다운로드"
                on:click={$downloadImage}
                role="presentation"
            />
        </div>
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

        cursor: pointer;
    }
    .download[data-theme="dark"] {
        filter: invert(100%);
    }
</style>
