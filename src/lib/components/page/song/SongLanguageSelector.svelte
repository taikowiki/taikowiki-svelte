<script lang="ts" context="module">
    function saveSongLang(songLang: SongLang) {
        window.localStorage?.setItem("songLang", songLang);
    }
    function getResizeObserver(ghost: HTMLDivElement) {
        return new ResizeObserver((entires) => {
            const target = entires[0].target as HTMLElement;
            ghost.style.width = `${target.offsetWidth}px`;
            ghost.style.height = `${target.offsetHeight}px`;
            ghost.style.top = `${target.offsetTop}px`;
            ghost.style.left = `${target.offsetLeft}px`;
        });
    }
</script>

<script lang="ts">
    import type { SongLang } from "$lib/module/common/song/types";
    import { browser } from "$app/environment";
    import { getTheme } from "$lib/module/layout/theme";
    import SongLanguageButton from "./SongLanguageButton.svelte";

    export let songLang: SongLang = "jp";
    if (browser) {
        songLang =
            (window.localStorage?.getItem("songLang") as SongLang | null) ||
            songLang;
    }

    $: saveSongLang(songLang);

    let ghost: HTMLDivElement;
    let btn: HTMLElement;

    $: resizeObserver = ghost ? getResizeObserver(ghost) : null

    $: if (btn && resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver.observe(btn);
    }

    /*
    onDestroy(() => {
        resizeObserver = null;
    })
    */
    const [theme] = getTheme();
</script>

<div class="wrapper">
    <div class="ghost" bind:this={ghost} data-theme={$theme} />
    <div class="container">
        {#if ghost}
            <SongLanguageButton bind:btn bind:songLang value="jp">
                일본어
            </SongLanguageButton>
            <SongLanguageButton bind:btn bind:songLang value="ko">
                한국어
            </SongLanguageButton>
            <SongLanguageButton bind:btn bind:songLang value="ako">
                한국어(비공식)
            </SongLanguageButton>
            <!--
            <SongLanguageButton bind:btn bind:songLang value="en">
                영어
            </SongLanguageButton>
            <SongLanguageButton bind:btn bind:songLang value="aen">
                영어(비공식)
            </SongLanguageButton>
        -->
        {/if}
    </div>
</div>

<style>
    .wrapper {
        position: relative;
    }

    .container {
        display: flex;
        position: inherit;

        column-gap: 10px;
    }

    .ghost {
        position: absolute;
        background-color: #cf4844;

        transition:
            top 0.2s,
            left 0.2s;

        border-radius: 5px;
    }
    .ghost[data-theme="dark"] {
        background-color: #1c1c1c;
    }
</style>
