<script lang="ts">
    import type { Gamecenter } from "$lib/module/gamecenter";
    import type { Writable } from "svelte/store";
    import GamecenterInfo from "./GamecenterInfo.svelte";
    import { getContext } from "svelte";
    import { getI18N, getLang } from "$lib/module/i18n";

    interface Props {
        gamecenterDatas: Gamecenter.Gamecenter[];
        favorites: Writable<number[]>;
        distanceMap: Map<Gamecenter.Gamecenter, number>;
        gamecenterMarkers: Record<
            number,
            {
                marker: kakao.maps.Marker;
                iwOpened: boolean;
                iw: kakao.maps.InfoWindow;
            }
        >;
        map: kakao.maps.Map;
    }

    let {
        gamecenterDatas = $bindable(),
        favorites,
        distanceMap,
        gamecenterMarkers,
        map,
    }: Props = $props();

    const user = getContext("user") as Writable<{ logined: boolean }>;

    let favoriteGamecenters = $derived(
        $favorites
            .map((order) =>
                gamecenterDatas.find((data) => data.order === order),
            )
            .filter((e) => e !== undefined),
    );

    //모바일 사이드
    const mobileAsideOpened = getContext(
        "mobileAsideOpened",
    ) as Writable<boolean>;

    const lang = getLang();
    let i18n = $derived(getI18N("/gamecenter", $lang));
</script>

<div class="container">
    {#if $user.logined}
        {#each favoriteGamecenters as gamecenterData, index}
            <GamecenterInfo
                bind:gamecenterData={favoriteGamecenters[index]}
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
                >{i18n.login}</a
            >{i18n.needed}
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

        row-gap: 5px;
    }
</style>
