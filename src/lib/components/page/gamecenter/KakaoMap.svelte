<script lang="ts" context="module">
    //오락실 마커 생성
    async function createGamecenterMarkers(
        gamecenterDatas: GameCenterData[],
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
        const geocoder = new kakaoMap.services.Geocoder();
        for (const gamecenterData of gamecenterDatas) {
            //주소 검색 후 좌표 얻기
            const result = (await new Promise((res) => {
                geocoder.addressSearch(gamecenterData.address, res);
            })) as any[];

            if (!result[0]) {
                console.warn(gamecenterData.name, "주소 검색 오류");
                continue;
            }

            //marker 생성
            const marker = new kakaoMap.Marker({
                map,
                position: new kakaoMap.LatLng(result[0].y, result[0].x),
            });

            //infowindow 생성
            const infoWindowDiv = document.createElement("div");
            infoWindowDiv.style.display = "flex";
            infoWindowDiv.style.justifyContent = "center";
            infoWindowDiv.style.width = "200px";
            infoWindowDiv.style.height = "auto";
            new MarkerInfo({
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
    import type { GameCenterData } from "$lib/module/page/gamecenter/types";
    import getKakaoMap from "$lib/module/page/gamecenter/kakao.client";
    import { onDestroy, onMount } from "svelte";
    import KakaoMapAside from "./KakaoMapAside.svelte";
    import MarkerInfo from "./MarkerInfo.svelte";
    import Loading from "$lib/components/common/Loading.svelte";

    //오락실
    export let gamecenterDatas: GameCenterData[];

    const gamecenterMarkers: Record<
        number,
        {
            marker: kakao.maps.Marker;
            iwOpened: boolean;
            iw: kakao.maps.InfoWindow;
        }
    > = {};
    export let markerLoaded = false;

    //지도 관련 변수
    const kakaoMap = getKakaoMap();

    let mapContainer: HTMLDivElement;
    let map: kakao.maps.Map;

    let canUseGeolocation = "geolocation" in window.navigator;
    let currentPositionMarker: kakao.maps.Marker;
    let watchCallbackId: number;

    let setCenterToCurrentPosition: () => any = () => {};

    onMount(async () => {
        //오락실 마커 로딩 되면 지도 표시
        //mapContainer.style.display = "none";

        //지도 생성
        map = new kakaoMap.Map(mapContainer, {
            level: 12,
            center: new kakaoMap.LatLng(36.59378832827889, 128.0195306619556),
        });

        //현재 위치
        (async () => {
            if (!canUseGeolocation) {
                return;
            }

            let [x, y]: [number, number] = await new Promise((res) => {
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
                        throw error;
                    },
                );
            });

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
                map.setCenter(currentPositionMarker.getPosition());
            };

            watchCallbackId = navigator.geolocation.watchPosition(
                (position) => {
                    currentPositionMarker.setPosition(
                        new kakaoMap.LatLng(
                            position.coords.latitude,
                            position.coords.longitude,
                        ),
                    );
                },
            );
        })();

        //오락실 마커
        (async () => {
            await createGamecenterMarkers(
                gamecenterDatas,
                gamecenterMarkers,
                kakaoMap,
                map,
            );

            markerLoaded = true;

            //오락실 마커 로딩 되면 지도 표시
            /*
            mapContainer.style.display = "block";
            const center = map.getCenter();
            map.relayout();
            map.setCenter(center);
            */
        })();
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
<div class="map-container" bind:this={mapContainer}>
    <div class="button-container">
        {#if canUseGeolocation}
            <button
                class="map-button current-button"
                on:click={setCenterToCurrentPosition}
            />
        {/if}
        <button
            class="map-button plus-button"
            on:click={() => {
                map.setLevel(map.getLevel() - 1);
            }}
        />
        <button
            class="map-button minus-button"
            on:click={() => {
                map.setLevel(map.getLevel() + 1);
            }}
        />
    </div>

    {#if markerLoaded}
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
