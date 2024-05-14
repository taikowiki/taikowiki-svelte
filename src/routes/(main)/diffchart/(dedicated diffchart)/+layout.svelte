<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";
    import { setContext } from "svelte";
    import { writable } from "svelte/store";

    const downloadImage = writable<(() => any) | null>(null);
    setContext("downloadImage", downloadImage);

    const [theme] = getTheme();
</script>

<div class="h">
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
<slot />

<style>
    .h {
        width: 100%;
        min-height: 30px;

        display: flex;
        flex-direction: row;
        align-items: center;

        margin-bottom: 10px;
    }

    .download {
        width: 30px;
        height: 30px;

        cursor: pointer;
    }
    .download[data-theme="dark"] {
        filter: invert(100%);
    }
</style>
