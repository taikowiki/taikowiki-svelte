<script lang="ts">
    import type { GameCenterData } from "$lib/module/common/gamecenter/types";
    import type { Writable } from "svelte/store";
    import GamecenterInfo from "./GamecenterInfo.svelte";
    import { getContext } from "svelte";

    export let gamecenterDatas: GameCenterData[];
    export let favorites: Writable<number[]>;
    export let distanceMap: Map<GameCenterData, number>;
    export let gamecenterMarkers: Record<
        number,
        {
            marker: kakao.maps.Marker;
            iwOpened: boolean;
            iw: kakao.maps.InfoWindow;
        }
    >;
    export let map: kakao.maps.Map;

    const user = getContext("user") as Writable<{ logined: boolean }>;

    $: favoriteGamecenters = $favorites
        .map((order) => gamecenterDatas.find((data) => data.order === order))
        .filter((e) => e !== undefined);

    //모바일 사이드
    const mobileAsideOpened = getContext(
        "mobileAsideOpened",
    ) as Writable<boolean>;
</script>

<div class="container">
    {#if $user.logined}
        {#each favoriteGamecenters as gamecenterData}
            <GamecenterInfo
                {gamecenterData}
                {favorites}
                distance={distanceMap.get(gamecenterData)}
                clickHandle={() => {
                    const marker = gamecenterMarkers[gamecenterData.order];
                    if (!marker) return;

                    Object.values(gamecenterMarkers).forEach((e) => {
                        e.iwOpened = false;
                        e.iw.close();
                    });

                    marker.iwOpened = true;
                    marker.iw.open(map, marker.marker);

                    map.setCenter(marker.marker.getPosition());

                    $mobileAsideOpened = false;
                }}
            />
        {/each}
    {:else}
        <span>
            <a
                href={`/auth/login?redirect_to=${encodeURIComponent("/gamecenter")}`}
                >로그인</a
            >이 필요합니다.
        </span>
    {/if}
</div>

<style>
    .container {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;

        margin-top: 3px;

        overflow-y: auto;
    }
</style>
