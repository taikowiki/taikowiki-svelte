<script lang="ts">
    import type { GameCenterData } from "$lib/module/common/gamecenter/types";
    import { getContext, onMount } from "svelte";
    import KakaoMapAsideContentSearch from "./KakaoMapAsideContentSearch.svelte";
    import KakaoMapAsideContentFavorites from "./KakaoMapAsideContentFavorites.svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import { getLang } from "$lib/module/common/i18n/i18n";
    import { gamecenterRequestor } from "$lib/module/common/gamecenter/gamecenter.client";
    import { writable } from "svelte/store";
    import getKakaoMap from "$lib/module/common/gamecenter/kakao.client";

    interface Props {
        map: kakao.maps.Map;
        scene: "search" | "favorites";
        currentPositionMarker: kakao.maps.Marker | undefined;
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
        scene,
        currentPositionMarker,
        gamecenterMarkers,
        gamecenterDatas: gcData,
    }: Props = $props();

    const kakaoMap = getKakaoMap();

    let container: HTMLDivElement;
    let gamecenterDatas = $state(gcData);

    const distanceMap = new Map<GameCenterData, number>();
    if (currentPositionMarker) {
        const coords = currentPositionMarker.getPosition();

        //svelte-ignore state_referenced_locally
        gamecenterDatas.forEach((data) => {
            const marker = gamecenterMarkers[data.order];

            if (!marker) {
                return;
            }

            const distance = new kakaoMap.Polyline({
                path: [coords, marker.marker.getPosition()],
            }).getLength();

            distanceMap.set(data, distance);
        });
    }

    //즐찾
    let favorites = writable<number[]>([]);

    onMount(() => {
        gamecenterRequestor.getFavorites(null).then((response) => {
            if (response.status === "success") {
                $favorites = response.data;
            }
        });
    });
</script>

<div bind:this={container} class="container">
    {#if scene === "search"}
        <KakaoMapAsideContentSearch
            {favorites}
            bind:gamecenterDatas
            {distanceMap}
            {gamecenterMarkers}
            {map}
        />
    {:else}
        <KakaoMapAsideContentFavorites
            {favorites}
            bind:gamecenterDatas
            {distanceMap}
            {gamecenterMarkers}
            {map}
        />
    {/if}
</div>

<style>
    .container {
        width: 100%;
        height: 100%;
    }
</style>
