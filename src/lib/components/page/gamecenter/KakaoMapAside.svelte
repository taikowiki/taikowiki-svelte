<script lang="ts">
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import KakaoMapAsideSceneSelector from "./KakaoMapAsideSceneSelector.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile.js";
    import { browser } from "$app/environment";
    import type { GameCenterData } from "$lib/module/common/gamecenter/types";
    import KakaoMapAsideContent from "./KakaoMapAsideContent.svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import { writable } from "svelte/store";
    import { setContext } from "svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";

    interface Props {
        map: kakao.maps.Map;
        currentPositionMarker?: kakao.maps.Marker;
        gamecenterMarkers: Record<
            number,
            {
                marker: kakao.maps.Marker;
                iwOpened: boolean;
                iw: kakao.maps.InfoWindow;
            }
        >;
        gamecenterDatas: GameCenterData[];
    }

    let {
        map,
        currentPositionMarker,
        gamecenterMarkers,
        gamecenterDatas,
    }: Props = $props();

    let scene: "search" | "favorites" = $state("search");

    let content: HTMLDivElement | undefined = $state();
    let pcContentContainer: HTMLDivElement | undefined = $state();
    let mobileContentContainer: HTMLDivElement | undefined = $state();

    const isMobile = getIsMobile();

    $effect.pre(() => {
        if (browser && mobileContentContainer && pcContentContainer && content) {
            if ($isMobile) {
                mobileContentContainer.appendChild(content);
            } else {
                pcContentContainer.appendChild(content);
            }
        }
    });

    const mobileOpened = writable<boolean>(false);
    setContext("mobileAsideOpened", mobileOpened);
    $effect.pre(() => {
        if (mobileContentContainer) {
            if ($mobileOpened) {
                mobileContentContainer.style.transform = "translateX(0)";
            } else {
                mobileContentContainer.style.transform = "translateX(-100%)";
            }
            if (!$isMobile) {
                mobileContentContainer.style.display = "none";
            } else {
                mobileContentContainer.style.display = "block";
            }
        }
    });

    const [theme] = getTheme();

    const lang = getLang();
    let i18n = $derived(getI18N("/gamecenter", $lang));
</script>

<!--pc-->
<PageAside>
    <div bind:this={pcContentContainer} class="container"></div>
</PageAside>

<!--mobile-->
<div
    bind:this={mobileContentContainer}
    class="mobile-container"
    data-theme={$theme}
>
    {#if $mobileOpened}
        <button
            class="mobile-close"
            onclick={() => {
                $mobileOpened = false;
            }}>X</button
        >
    {:else}
        <button
            class="mobile-open"
            onclick={() => {
                $mobileOpened = true;
            }}
            aria-label="mobile open"
        ></button>
    {/if}
</div>

<!--content-->
<div bind:this={content} class="container" class:isMobile={$isMobile}>
    <KakaoMapAsideSceneSelector bind:scene />
    <div class="scene">
        <KakaoMapAsideContent
            {currentPositionMarker}
            {gamecenterDatas}
            {gamecenterMarkers}
            {scene}
            {map}
        />
    </div>
    <div>
        <a href="/gamecenter/report">{i18n.report}</a>
    </div>
</div>

<style>
    .container {
        width: 100%;
        max-height: calc(100vh - 100px);

        display: flex;
        flex-direction: column;
    }
    .container.isMobile {
        height: 100%;
        max-height: none;
    }

    .mobile-container {
        width: 100%;
        height: 100%;

        position: absolute;
        top: 0;

        z-index: 5;

        background-color: white;

        box-sizing: border-box;

        transition: transform 0.15s;
    }
    .mobile-container[data-theme="dark"] {
        background-color: #282828;
    }

    .mobile-open {
        width: 30px;
        height: 30px;

        position: absolute;
        top: 10px;
        right: -40px;

        z-index: 6;

        display: flex;
        justify-content: center;
        align-items: center;

        background-image: url("/assets/icon/map/double-right-arrow.svg");
        background-repeat: no-repeat;
        background-size: 60%;
        background-position: 7px center;

        border-radius: 5px;
        border-width: 1px;
        outline: 0;
    }
    .mobile-close {
        width: 25px;
        height: 25px;

        position: absolute;
        top: 0;
        right: 0;

        z-index: 6;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .scene {
        overflow-y: auto;

        scrollbar-width: none;
    }
    .scene::-webkit-scrollbar {
        display: none;
    }
</style>
