<script lang="ts">
    import type { GameCenterData } from "$lib/module/common/gamecenter/types";
    import { afterUpdate, getContext, onMount } from "svelte";
    import KakaoMapAsideContentSearch from "./KakaoMapAsideContentSearch.svelte";
    import KakaoMapAsideContentFavorites from "./KakaoMapAsideContentFavorites.svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import i18n, { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { GamecenterRequestor } from "$lib/module/common/gamecenter/gamecenter";

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

    let container: HTMLDivElement;
    let searchContainer: HTMLDivElement;
    let favoritesContainer: HTMLDivElement;

    const [theme, setTheme] = getTheme();
    const lang = getLang();
    const user = getContext("user");

    //즐찾
    let favorites: number[] = [];

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

        const searchComponent = new KakaoMapAsideContentSearch({
            target: searchContainer,
            props: {
                currentPositionMarker,
                gamecenterDatas,
                gamecenterMarkers,
                map,
                favorites,
            },
            context,
        });

        const favoriteComponent = new KakaoMapAsideContentFavorites({
            target: favoritesContainer,
            context,
        });

        GamecenterRequestor.getFavorties().then((response) => {
            if (response.status === "success") {
                let favorites: number[] = response.data;
                searchComponent.$set({
                    favorites
                });
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
