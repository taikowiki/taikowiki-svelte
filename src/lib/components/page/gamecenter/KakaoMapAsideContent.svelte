<script lang="ts">
    import type { GameCenterData } from "$lib/module/page/gamecenter/types";
    import { afterUpdate, getContext, onMount } from "svelte";
    import KakaoMapAsideContentSearch from "./KakaoMapAsideContentSearch.svelte";
    import KakaoMapAsideContentFavorites from "./KakaoMapAsideContentFavorites.svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import { getLang } from "$lib/module/common/i18n/i18n";
    import { GamecenterRequestor } from "$lib/module/page/gamecenter/gamecenter";
    import { writable } from "svelte/store";
    import getKakaoMap from "$lib/module/page/gamecenter/kakao.client";

    export let map: kakao.maps.Map;
    export let scene: "search" | "favorites";
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

    const kakaoMap = getKakaoMap();

    let container: HTMLDivElement;
    let searchContainer: HTMLDivElement;
    let favoritesContainer: HTMLDivElement;

    const [theme, setTheme] = getTheme();
    const lang = getLang();
    const user = getContext("user");
    const mobileAsideOpened = getContext('mobileAsideOpened');

    const distanceMap = new Map<GameCenterData, number>();
    if (currentPositionMarker) {
        const coords = currentPositionMarker.getPosition();

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
        searchContainer = document.createElement("div");
        favoritesContainer = document.createElement("div");

        searchContainer.style.width = "100%";
        favoritesContainer.style.width = "100%";

        const context = new Map<any, any>();
        context.set("theme", theme);
        context.set("setTheme", setTheme);
        context.set("lang", lang);
        context.set("user", user);
        context.set("mobileAsideOpened", mobileAsideOpened);

        const searchComponent = new KakaoMapAsideContentSearch({
            target: searchContainer,
            props: {
                gamecenterDatas,
                gamecenterMarkers,
                map,
                favorites,
                distanceMap
            },
            context,
        });

        const favoriteComponent = new KakaoMapAsideContentFavorites({
            target: favoritesContainer,
            props: {
                favorites,
                gamecenterDatas,
                distanceMap,
                gamecenterMarkers,
                map
            },
            context,
        });

        GamecenterRequestor.getFavorties().then((response) => {
            if (response.status === "success") {
                $favorites = response.data;
            }
        });
    });

    afterUpdate(() => {
        if (!container || !searchContainer || !favoritesContainer) {
            return;
        }

        container.childNodes.forEach((child) => {
            container.removeChild(child);
        });

        if (scene === "search") {
            container.appendChild(searchContainer);
        } else {
            container.appendChild(favoritesContainer);
        }
    });
</script>

<div bind:this={container} class="container" />

<style>
    .container {
        width: 100%;
        height: 100%;
    }
</style>
