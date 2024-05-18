<script lang="ts" context="module">
    function usePageAside() {
        let pageAside = writable<HTMLDivElement | null>(null);
        setContext("pageAside", pageAside);

        return pageAside;
    }

    function resetPageAside(pageAside: Writable<HTMLDivElement | null>) {
        return () => {
            let p = get(pageAside);
            if (p) {
                p.innerHTML = "";
            }
        };
    }
    function setPageAsideDisplay(pageAside: Writable<HTMLDivElement | null>) {
        return () => {
            let p = get(pageAside);
            if (p) {
                if (p.innerHTML === "") {
                    p.style.display = "none";
                } else {
                    p.style.display = "block";
                }
            }
        };
    }
</script>

<script lang="ts">
    import { browser } from "$app/environment";
    import Aside from "$lib/components/layout/main/Aside.svelte";
    import AsideNewSong from "$lib/components/layout/main/Aside-NewSong.svelte";
    import Header from "$lib/components/layout/main/Header.svelte";
    import HeaderItem from "$lib/components/layout/main/HeaderItem.svelte";
    import Main from "$lib/components/layout/main/Main.svelte";
    import ThemeToggler from "$lib/components/layout/main/ThemeToggler.svelte";
    import useTheme from "$lib/module/layout/theme";
    import { useIsMobile } from "$lib/module/layout/isMobile.js";
    import { navigating, page } from "$app/stores";
    import Loading from "$lib/components/common/Loading.svelte";
    import i18n, { setI18N, useLang } from "$lib/module/common/i18n/i18n";
    import LanguageSelector from "$lib/components/layout/main/LanguageSelector.svelte";
    import { writable, get, type Writable } from "svelte/store";
    import { type PathLangFile } from "$lib/module/common/i18n/types.js";
    import { setContext } from "svelte";
    import { beforeNavigate, afterNavigate } from "$app/navigation";
    import { inject } from '@vercel/analytics';

    export let data;

    let [theme, _] = useTheme();
    $: if (browser) {
        document.body.setAttribute("data-theme", $theme);
    }

    useIsMobile();

    const lang = useLang();
    $: i18nLayout = i18n[$lang].layout.main;
    const i18nPage = writable<PathLangFile>(setI18N($lang, $page.url.pathname));
    setContext("i18n", i18nPage);
    $: $i18nPage = setI18N($lang, $page.url.pathname);

    const pageAside = usePageAside();
    beforeNavigate(resetPageAside(pageAside));
    //afterNavigate(setPageAsideDisplay(pageAside));
    if(data.songs){
        setContext('songs', data.songs);
    }
    inject();
</script>

{#if $theme}
    <Header>
        <svelte:fragment slot="left">
            <HeaderItem icon="/assets/icon/song.svg" href="/song">
                {i18nLayout.song}
            </HeaderItem>
            <HeaderItem icon="/assets/icon/document.svg" href="/">
                {i18nLayout.doc}
            </HeaderItem>
            <HeaderItem icon="/assets/icon/leaderboard.svg" href="/diffchart">
                {i18nLayout.diffchart}
            </HeaderItem>
        </svelte:fragment>
        <svelte:fragment slot="right">
            <ThemeToggler />
            <LanguageSelector />
        </svelte:fragment>
    </Header>
    <Main>
        <svelte:fragment slot="main">
            {#if $navigating}
                <Loading />
            {:else}
                <slot />
            {/if}
        </svelte:fragment>
        <Aside slot="aside">
            <div bind:this={$pageAside} class="page-aside"/>
            <AsideNewSong newSongs={data.newSongs} />
        </Aside>
    </Main>
{/if}

<style>
    :global(body[data-theme="light"]) {
        background-color: #e8e8e8;
        color: black;
    }
    :global(body[data-theme="dark"]) {
        background-color: black;
        color: white;
    }
    :global(body[data-theme="dark"] a) {
        color: #e1a743;
    }

    .page-aside:empty{
        display:none;
    }
</style>
