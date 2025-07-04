<script lang="ts" module>
    //오락실 마커 생성
    function createGamecenterMarkers(
        gamecenterDatas: Gamecenter.Gamecenter[],
        gamecenterMarkers: Record<
            number,
            {
                marker: kakao.maps.Marker;
                iwOpened: boolean;
                iw: kakao.maps.InfoWindow;
            }
        >,
        kakaoMap: typeof kakao.maps,
        map: kakao.maps.Map,
    ) {
        for (const gamecenterData of gamecenterDatas) {
            if (
                gamecenterData.coor.x === null ||
                gamecenterData.coor.y === null
            ) {
                console.warn(gamecenterData.name, "좌표 오류");
                continue;
            }

            //marker 생성
            const marker = new kakaoMap.Marker({
                map,
                position: new kakaoMap.LatLng(
                    gamecenterData.coor.y,
                    gamecenterData.coor.x,
                ),
            });

            //infowindow 생성
            const infoWindowDiv = document.createElement("div");
            infoWindowDiv.style.display = "flex";
            infoWindowDiv.style.justifyContent = "center";
            infoWindowDiv.style.width = "200px";
            infoWindowDiv.style.height = "auto";
            mount(MarkerInfo, {
                target: infoWindowDiv,
                props: {
                    gamecenterData,
                },
            });
            const infoWindow = new kakaoMap.InfoWindow({
                content: infoWindowDiv,
                zIndex: 200000,
            });

            //marker 객체에 넣기
            const markerData = {
                marker,
                iwOpened: false,
                iw: infoWindow,
            };
            gamecenterMarkers[gamecenterData.order] = markerData;

            kakaoMap.event.addListener(marker, "click", () => {
                if (markerData.iwOpened) {
                    infoWindow.close();
                    markerData.iwOpened = false;
                } else {
                    Object.values(gamecenterMarkers).forEach(
                        (gamecenterMarker) => {
                            gamecenterMarker.iwOpened = false;
                            gamecenterMarker.iw.close();
                        },
                    );
                    infoWindow.open(map, marker);
                    markerData.iwOpened = true;
                }
            });
        }
    }
</script>

<script lang="ts">
    import { Gamecenter } from "$lib/module/gamecenter";
    import "$lib/module/gamecenter/gamecenter.client";
    import { mount, onDestroy, onMount } from "svelte";
    import KakaoMapAside from "./KakaoMapAside.svelte";
    import MarkerInfo from "./MarkerInfo.svelte";

    interface Props {
        gamecenterDatas: Gamecenter.Gamecenter[];
        markerLoaded?: boolean;
    }

    let { gamecenterDatas, markerLoaded = false }: Props = $props();

    //오락실
    let gamecenterMarkers: Record<
        number,
        {
            marker: kakao.maps.Marker;
            iwOpened: boolean;
            iw: kakao.maps.InfoWindow;
        }
    > = $state({});

    //지도 관련 변수
    const kakaoMap = Gamecenter.Client.getKakaoMap();

    let mapContainer: HTMLDivElement | undefined = $state();
    let map: kakao.maps.Map | undefined = $state();

    let canUseGeolocation = $state("geolocation" in window.navigator);
    let currentPositionMarker: kakao.maps.Marker | undefined = $state();
    let watchCallbackId: number;

    let setCenterToCurrentPosition: () => any = $state(() => {});

    onMount(async () => {
        //오락실 마커 로딩 되면 지도 표시
        //mapContainer.style.display = "none";

        //지도 생성
        if (!mapContainer) return;

        map = new kakaoMap.Map(mapContainer, {
            level: 12,
            center: new kakaoMap.LatLng(36.59378832827889, 128.0195306619556),
        });

        //현재 위치
        await (async () => {
            if (!canUseGeolocation || !map) {
                return;
            }

            try {
                var [x, y]: [number, number] = await new Promise((res, rej) => {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            res([
                                position.coords.latitude,
                                position.coords.longitude,
                            ]);
                        },
                        (error) => {
                            if (error.code == error.PERMISSION_DENIED) {
                                canUseGeolocation = false;
                            }
                            rej(error);
                        },
                    );
                });
            } catch {
                return;
            }

            map.setCenter(new kakaoMap.LatLng(x, y));

            currentPositionMarker = new kakaoMap.Marker({
                map,
                position: new kakaoMap.LatLng(x, y),
                image: new kakaoMap.MarkerImage(
                    "/assets/icon/map/current.svg",
                    new kakaoMap.Size(15, 15),
                ),
                zIndex: 100000,
            });

            setCenterToCurrentPosition = () => {
                (map as kakao.maps.Map).setCenter(
                    (currentPositionMarker as kakao.maps.Marker).getPosition(),
                );
            };

            watchCallbackId = navigator.geolocation.watchPosition(
                (position) => {
                    (currentPositionMarker as kakao.maps.Marker).setPosition(
                        new kakaoMap.LatLng(
                            position.coords.latitude,
                            position.coords.longitude,
                        ),
                    );
                },
            );
        })();

        createGamecenterMarkers(
            gamecenterDatas,
            gamecenterMarkers,
            kakaoMap,
            map,
        );

        markerLoaded = true;
    });

    onDestroy(() => {
        navigator.geolocation.clearWatch(watchCallbackId);
    });
</script>

<!-- 오락실 마커 로딩 되면 지도 표시
{#if !markerLoaded}
    <div style="width: 100%;text-align: center;">
        <Loading />
    </div>
{/if}
-->
{#snippet currentPositionBtn()}
    {#if canUseGeolocation}
        <button
            class="map-button current-button"
            onclick={setCenterToCurrentPosition}
            aria-label="current position"
        ></button>
    {/if}
{/snippet}
{#snippet zoomInBtn()}
    <button
        class="map-button plus-button"
        onclick={() => {
            if (!map) return;
            map.setLevel(map.getLevel() - 1);
        }}
        aria-label="zoom in"
    ></button>
{/snippet}
{#snippet zoomOutBtn()}
    <button
        class="map-button minus-button"
        onclick={() => {
            if (!map) return;
            map.setLevel(map.getLevel() + 1);
        }}
        aria-label="zoom out"
    ></button>
{/snippet}

<div class="map-container" bind:this={mapContainer}>
    <div class="button-container">
        {@render currentPositionBtn()}
        {@render zoomInBtn()}
        {@render zoomOutBtn()}
    </div>

    {#if markerLoaded && map}
        <KakaoMapAside
            {currentPositionMarker}
            {gamecenterMarkers}
            {gamecenterDatas}
            {map}
        />
    {/if}
</div>

<style>
    .map-container {
        width: 100%;
        height: calc(100vh - 105px);
        position: relative;
    }

    .button-container {
        display: flex;
        flex-direction: column;

        top: 10px;
        right: 10px;
        position: absolute;
        z-index: 2;

        row-gap: 2px;
    }
    .map-button {
        width: 30px;
        height: 30px;

        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 5px;
        outline: 0;
        border: 1px solid black;
        box-sizing: border-box;

        background-position: center center;
        background-size: 70%;
        background-repeat: no-repeat;
    }

    .current-button {
        background-image: url("/assets/icon/map/goto-current.svg");
    }
    .plus-button {
        background-image: url("/assets/icon/map/plus.svg");
    }
    .minus-button {
        background-image: url("/assets/icon/map/minus.svg");
    }

    @media only screen and (max-width: 1000px) {
        .map-container {
            height: 100%;
        }
    }
</style>
