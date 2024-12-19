<script lang="ts" module>
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

    const languages: SongLang[] = ["ja", "ko", "ako", "en", "aen", "rom"];
</script>

<script lang="ts">
    import type { SongLang } from "$lib/module/common/song/types";
    import { browser } from "$app/environment";
    import { getTheme } from "$lib/module/layout/theme";
    import SongLanguageButton from "./SongLanguageButton.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    interface Props {
        songLang: SongLang;
    }

    let { songLang = $bindable("ja") }: Props = $props();
    if (browser) {
        songLang =
            (window.localStorage?.getItem("songLang") as SongLang | null) ||
            songLang;
        if (!languages.includes(songLang)) {
            songLang = "ja";
        }
    }

    $effect(() => {
        if (browser) {
            saveSongLang(songLang);
        }
    });

    let ghost: HTMLDivElement | undefined = $state();
    let btn: HTMLElement | undefined = $state();

    let resizeObserver = $derived(ghost ? getResizeObserver(ghost) : null);

    $effect(() => {
        if (btn && resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver.observe(btn);
        }
    });

    /*
    onDestroy(() => {
        resizeObserver = null;
    })
    */
    const [theme] = getTheme();
    const isMobile = getIsMobile();
    const lang = getLang();
    let i18n = $derived(getI18N("/song", $lang));
</script>

{#key $isMobile}
    <div class="wrapper">
        <div class="ghost" bind:this={ghost} data-theme={$theme}></div>
        <div class="container">
            {#if ghost}
                {#each languages as language}
                    <SongLanguageButton bind:btn bind:songLang value={language}>
                        {i18n.languages[language]}
                    </SongLanguageButton>
                {/each}
            {/if}
        </div>
    </div>
{/key}

<style>
    .wrapper {
        position: relative;
    }

    .container {
        display: flex;
        position: inherit;
        flex-wrap: wrap;
        row-gap: 5px;

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
