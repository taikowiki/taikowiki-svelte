<script lang="ts" module>
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
</script>

<script lang="ts">
    import ServiceLayout from "$lib/components/layout/ServiceLayout.svelte";
    import { browser } from "$app/environment";
    import Aside from "$lib/components/layout/main/Aside.svelte";
    import AsideNewSong from "$lib/components/layout/main/Aside-NewSong.svelte";
    import Header from "$lib/components/layout/main/Header.svelte";
    import HeaderItem from "$lib/components/layout/main/HeaderItem.svelte";
    import Main from "$lib/components/layout/main/Main.svelte";
    import useTheme from "$lib/module/layout/theme";
    import { useIsMobile } from "$lib/module/layout/isMobile.js";
    import { navigating, page } from "$app/stores";
    import Loading from "$lib/components/common/Loading.svelte";
    import i18n, { setI18N, useLang } from "$lib/module/common/i18n/i18n";
    import { writable, get, type Writable } from "svelte/store";
    import { type PathLangFile } from "$lib/module/common/i18n/types.js";
    import { getContext, onMount, setContext } from "svelte";
    import {
        afterNavigate,
        beforeNavigate,
        goto,
        pushState,
        replaceState,
    } from "$app/navigation";
    import User from "$lib/components/layout/main/User.svelte";
    import Footer from "$lib/components/layout/main/Footer.svelte";
    import { userRequestor } from "$lib/module/common/user/user.client.js";
    import AsideBanner from "$lib/components/layout/main/Aside-Banner.svelte";
    import ScrollSetter from "$lib/components/layout/main/ScrollSetter.svelte";
    import HrefLang from "$lib/components/layout/main/HrefLang.svelte";

    let { data, children } = $props();
    //deepFreeze songs

    //theme
    let [theme, _] = useTheme(data.theme);

    //usemobile
    const isMobile = useIsMobile(data.isMobile);

    //lang
    const lang = useLang();
    let i18nLayout = $derived(i18n[$lang].layout.main);
    const i18nPage = writable<PathLangFile>(setI18N($lang, $page.url.pathname));
    setContext("i18n", i18nPage);
    $effect.pre(() => {
        $i18nPage = setI18N($lang, $page.url.pathname);
    });
    const usingLangParam: boolean = getContext("usingLangParam");
    beforeNavigate((navigation) => {
        if (usingLangParam && data.isBot) {
            navigation.to?.url?.searchParams?.set?.("lang", $lang);
        }
    });

    //page aside
    const pageAside = usePageAside();
    beforeNavigate(resetPageAside(pageAside));

    //user
    const user = writable<{ logined: boolean; nickname: string }>(data.user);
    setContext("user", user);

    //page scroll
    let pagePosition: number = 0;
    let pageScrolls: Map<number, number> = new Map();
    let currentScrollY = writable<number | null>(null);
    setContext("currentScrollY", currentScrollY);
    beforeNavigate(() => {
        pageScrolls.set(pagePosition, window.scrollY);
        pageScrolls = pageScrolls;
        $currentScrollY = null;
    });
    afterNavigate((navigation) => {
        try {
            if (navigation.delta === undefined) {
                const pageScrollsArr = [...pageScrolls].toSorted(
                    (a, b) => a[0] - b[0],
                );
                const pagePositionIndex = pageScrollsArr.findIndex(
                    ([idx, _]) => idx === pagePosition,
                );
                pageScrolls = new Map(
                    pageScrollsArr.slice(0, pagePositionIndex + 1),
                );
                pagePosition = pagePosition + 1;
            } else {
                pagePosition += navigation.delta;
                $currentScrollY = pageScrolls.get(pagePosition) ?? 0;
            }
        } catch {
            pagePosition = -1;
            pageScrolls = new Map();
        }
    });
</script>

<svelte:head>
    <script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${data.kakaoKey}&libraries=services`}
    ></script>
    {#if !browser}
        {#if $theme === "light"}
            <style>
                a {
                    color: #cf4844;
                }
                body {
                    background-color: #e8e8e8;
                    color: black;
                }
            </style>
        {:else}
            <style>
                a {
                    color: #e1a743;
                }
                body {
                    background-color: black;
                    color: white;
                }
            </style>
        {/if}
    {/if}
</svelte:head>
{#key $navigating}
    <HrefLang />
{/key}
<img src="/assets/img/logo.webp" class="preview" alt="preview" />
<div>
    <Header>
        <svelte:fragment slot="left">
            <HeaderItem href="/" useHover={false}>
                {#if $isMobile}
                    <img
                        class="logo-mobile"
                        src="/assets/img/logo_mobile.webp"
                        alt="logo"
                    />
                {:else}
                    <img class="logo" src="/assets/img/logo.webp" alt="logo" />
                {/if}
            </HeaderItem>
            <HeaderItem
                icon="/assets/icon/song.svg"
                href="/song"
                mobileHideSlot
            >
                <span class="header-text">{i18nLayout.song}</span>
            </HeaderItem>
            <HeaderItem
                icon="/assets/icon/document.svg"
                href="javascript:alert('WIP');"
                mobileHideSlot
            >
                <span class="header-text">{i18nLayout.doc}</span>
            </HeaderItem>
            <HeaderItem
                icon="/assets/icon/leaderboard.svg"
                href="/diffchart"
                mobileHideSlot
            >
                <span class="header-text">{i18nLayout.diffchart}</span>
            </HeaderItem>
            <HeaderItem
                icon="/assets/icon/dani.svg"
                href="/dani"
                mobileHideSlot
            >
                <span class="header-text">{i18nLayout.dani}</span>
            </HeaderItem>
            <HeaderItem
                icon="/assets/icon/maps-pin-header.svg"
                href="/gamecenter"
                mobileHideSlot
            >
                <span class="header-text">{i18nLayout.gamecenter}</span>
            </HeaderItem>
        </svelte:fragment>
        <svelte:fragment slot="right">
            <User />
            <HeaderItem
                icon="/assets/icon/donate.svg"
                href="/donate"
                mobileHideSlot
            />
        </svelte:fragment>
    </Header>
    <Main>
        {#snippet main()}
            {#if $navigating && !($navigating.from?.url.pathname === "/song" && $navigating.to?.url.pathname === "/song")}
                <Loading />
            {:else}
                {@render children?.()}
                {#if $page.url.pathname !== "/song"}
                    <ScrollSetter />
                {/if}
            {/if}
        {/snippet}
        {#snippet aside()}
            <Aside>
                <div bind:this={$pageAside} class="page-aside"></div>
                {#if data.asideBanners}
                    <AsideBanner banners={data.asideBanners} />
                {/if}
                <AsideNewSong newSongs={data.newSongs} />
            </Aside>
        {/snippet}
    </Main>
    <Footer version={data.version} />
</div>

<ServiceLayout />

<style>
    .page-aside:empty {
        display: none;
    }

    .logo {
        height: 38px;
        margin-right: -10px;
        transform: translateY(0.5px);
    }
    .logo-mobile {
        height: 30px;
        margin-right: -6px;
    }
    span.header-text {
        transform: translateY(-1px);
    }
</style>
