<script lang="ts">
    import { browser } from "$app/environment";
    import Aside from "$lib/components/layout/main/Aside.svelte";
    import Header from "$lib/components/layout/main/Header.svelte";
    import HeaderItem from "$lib/components/layout/main/HeaderItem.svelte";
    import Main from "$lib/components/layout/main/Main.svelte";
    import ThemeToggler from "$lib/components/layout/main/ThemeToggler.svelte";
    import useTheme from "$lib/module/layout/theme";
    import AsideNewSong from "$lib/components/layout/main/Aside-NewSong.svelte";
    import { useIsMobile } from "$lib/module/layout/isMobile.js";
    import { navigating, page } from "$app/stores";
    import Loading from "$lib/components/common/Loading.svelte";
    import { getI18N, useLang } from "$lib/module/common/i18n/i18n.js";
    import LanguageSelector from "$lib/components/layout/main/LanguageSelector.svelte";

    export let data;

    let [theme, _] = useTheme();
    $: if (browser) {
        document.body.setAttribute("data-theme", $theme);
    }

    useIsMobile();

    const lang = useLang();
    $: i18n = getI18N($lang, 'layout').main;
    
</script>

{#if $theme}
    <Header>
        <svelte:fragment slot="left">
            <HeaderItem icon="/assets/icon/song.svg" href="/song">
                {i18n.song}
            </HeaderItem>
            <HeaderItem icon="/assets/icon/document.svg" href="/">
                {i18n.doc}
            </HeaderItem>
        </svelte:fragment>
        <svelte:fragment slot="right">
            <ThemeToggler />
            <LanguageSelector/>
        </svelte:fragment>
    </Header>
    <Main>
        {#if $navigating}
            <Loading />
        {/if}
        <slot slot="main" />
        <Aside slot="aside">
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
</style>
