<script lang="ts">
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import KakaoMapAsideSceneSelector from "./KakaoMapAsideSceneSelector.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile.js";
    import { browser } from "$app/environment";
    import type { GameCenterData } from "$lib/module/common/gamecenter/types";
    import KakaoMapAsideContent from "./KakaoMapAsideContent.svelte";
    import { getTheme } from "$lib/module/layout/theme";

    export let map: kakao.maps.Map;
    export let currentPositionMarker: kakao.maps.Marker | undefined;
    export let gamecenterMarkers: Record<
        number,
        {
            marker: kakao.maps.Marker;
            iwOpened: boolean;
            iw: kakao.maps.InfoWindow;
        }
    >;
    export let gamecenterDatas: GameCenterData[];

    let scene: "search" | "favorites" = "search";

    let content: HTMLDivElement;
    let pcContentContainer: HTMLDivElement;
    let mobileContentContainer: HTMLDivElement;

    const isMobile = getIsMobile();

    $: if (browser && mobileContentContainer && pcContentContainer) {
        if ($isMobile) {
            mobileContentContainer.appendChild(content);
        } else {
            pcContentContainer.appendChild(content);
        }
    }

    const [theme] = getTheme();
</script>

<!--pc-->
<PageAside>
    <div bind:this={pcContentContainer} class="container" />
</PageAside>

<!--mobile-->
<div
    bind:this={mobileContentContainer}
    class="mobile-container"
    data-theme={$theme}
    style="{$isMobile ? `` : 'display:none'};"
/>

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
</div>

<style>
    .container {
        width: 100%;
        max-height: calc(100vh - 100px);

        display:flex;
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
    }
    .mobile-container[data-theme="dark"] {
        background-color: #282828;
    }

    .scene {
        overflow-y: auto;

        scrollbar-width: none;
    }
    .scene::-webkit-scrollbar {
        display: none;
    }

</style>
