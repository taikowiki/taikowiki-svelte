<script lang="ts" context="module">
    export type SongLang = "jp" | "ko" | "ako" | "en" | "aen";
</script>

<script lang="ts">
    import { browser } from "$app/environment";
    import { getTheme } from "$lib/module/layout/theme";
    //import { onDestroy } from "svelte";
    import SongLanguageButton from "./SongLanguageButton.svelte";

    export let songLang: SongLang = "jp";
    if (browser) {
        songLang =
            (window.localStorage?.getItem("songLang") as SongLang | null) ||
            songLang;
    }

    $: window.localStorage?.setItem("songLang", songLang);

    let ghost: HTMLDivElement;
    let btn: HTMLElement;

    let resizeObserver:ResizeObserver|null = new ResizeObserver((entires) => {
        const target = entires[0].target as HTMLElement;
        if (ghost) {
            ghost.style.width = `${target.offsetWidth}px`;
            ghost.style.height = `${target.offsetHeight}px`;
            ghost.style.top = `${target.offsetTop}px`;
            ghost.style.left = `${target.offsetLeft}px`;
        }
    });
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
    <div class="ghost" bind:this={ghost} data-theme={$theme}/>
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
        margin-top: 10px;
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
    .ghost[data-theme="dark"]{
        background-color: black;
    }
</style>
