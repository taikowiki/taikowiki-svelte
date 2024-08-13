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
    import useTheme from "$lib/module/layout/theme";
    import { useIsMobile } from "$lib/module/layout/isMobile.js";
    import { navigating, page } from "$app/stores";
    import Loading from "$lib/components/common/Loading.svelte";
    import i18n, { setI18N, useLang } from "$lib/module/common/i18n/i18n";
    import { writable, get, type Writable } from "svelte/store";
    import { type PathLangFile } from "$lib/module/common/i18n/types.js";
    import { setContext } from "svelte";
    import { beforeNavigate } from "$app/navigation";
    import User from "$lib/components/layout/main/User.svelte";
    import Footer from "$lib/components/layout/main/Footer.svelte";
    import { userRequestor } from "$lib/module/common/user/user.client.js";

    export let data;
    //deepFreeze songs

    //theme
    let [theme, _] = useTheme();
    $: if (browser) {
        document.body.setAttribute("data-theme", $theme);
    }

    //usemobile
    const isMobile = useIsMobile();

    //lang
    const lang = useLang();
    $: i18nLayout = i18n[$lang].layout.main;
    const i18nPage = writable<PathLangFile>(setI18N($lang, $page.url.pathname));
    setContext("i18n", i18nPage);
    $: $i18nPage = setI18N($lang, $page.url.pathname);

    //page aside
    const pageAside = usePageAside();
    beforeNavigate(resetPageAside(pageAside));
    /*afterNavigate(setPageAsideDisplay(pageAside));*/

    //user
    const user = writable<{ logined: boolean; nickname: string }>(data.user);
    setContext("user", user);
    $: if (($navigating || $page.state) && browser) {
        userRequestor.getUserData(null).then((response) => {
            if(response.status === 'success'){
                user.set(response.data);
            }
        })
    }
</script>

<svelte:head>
    <script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${data.kakaoKey}&libraries=services`}
    ></script>
</svelte:head>

<div style={browser ? "" : "transform:translateX(-100%);"}>
    <Header>
        <svelte:fragment slot="left">
            <HeaderItem href="/" useHover={false}>
                {#if $isMobile}
                    <img
                        class="logo"
                        src="/assets/img/logo_mobile.png"
                        alt="logo"
                    />
                {:else}
                    <img class="logo" src="/assets/img/logo.png" alt="logo" />
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
                href="/"
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
                icon="/assets/icon/table.svg"
                href="/measures"
                mobileHideSlot
            >
                <span class="header-text">{i18nLayout.measures}</span>
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
        </svelte:fragment>
    </Header>
    <Main>
        <svelte:fragment slot="main">
            {#if $navigating && !($navigating.from?.url.pathname === "/song" && $navigating.to?.url.pathname === "/song")}
                <Loading />
            {:else}
                <slot />
            {/if}
        </svelte:fragment>
        <Aside slot="aside">
            <div bind:this={$pageAside} class="page-aside" />
            <AsideNewSong newSongs={data.newSongs} />
        </Aside>
    </Main>
    <Footer version={data.version} />
</div>

<style>
    :global(body[data-theme="light"]) {
        background-color: #e8e8e8;
        color: black;
    }
    :global(body[data-theme="dark"]) {
        background-color: black;
        color: white;
    }
    :global(a){
        text-decoration: none;
    }

    .page-aside:empty {
        display: none;
    }

    .logo {
        height: 30px;
    }
    span.header-text {
        transform: translateY(-1px);
    }
</style>
