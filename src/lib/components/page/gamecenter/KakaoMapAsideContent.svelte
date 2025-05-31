<script lang="ts">
    import type { Gamecenter } from "$lib/module/gamecenter";
    import { onMount } from "svelte";
    import KakaoMapAsideContentSearch from "./KakaoMapAsideContentSearch.svelte";
    import KakaoMapAsideContentFavorites from "./KakaoMapAsideContentFavorites.svelte";
    import { GamecenterClient } from "$lib/module/gamecenter/gamecenter.client";
    import { writable } from "svelte/store";

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
        gamecenterDatas: Gamecenter.Gamecenter[];
    }

    let {
        map,
        scene,
        currentPositionMarker,
        gamecenterMarkers,
        gamecenterDatas: gcData,
    }: Props = $props();

    const kakaoMap = GamecenterClient.getKakaoMap();

    let container: HTMLDivElement;
    let gamecenterDatas = $state(gcData);

    const distanceMap = new Map<Gamecenter.Gamecenter, number>();
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
        GamecenterClient.request.getFavorites(null).then((response) => {
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
