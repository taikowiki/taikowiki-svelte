<script lang="ts">
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import getKakaoMap from "$lib/module/page/gamecenter/kakao.client";
    import { onMount } from "svelte";

    const kakaoMap = getKakaoMap();

    let mapContainer: HTMLDivElement;
    let map: kakao.maps.Map;

    const canUseGeolocation = "geolocation" in window.navigator;

    onMount(async () => {
        const [x, y] = canUseGeolocation
            ? await (new Promise((res) => {
                  navigator.geolocation.getCurrentPosition((position) => {
                      res([
                          position.coords.latitude,
                          position.coords.longitude,
                      ]);
                  });
              }) as Promise<[number, number]>)
            : [36.59378832827889, 128.0195306619556];
        map = new kakaoMap.Map(mapContainer, {
            level: 12,
            center: new kakaoMap.LatLng(x, y),
        });
    });

    // @ts-expect-error
    window.getCenter = function () {
        if (map) {
            console.log(map.getCenter());
        }
    };
</script>

<div class="map-container" bind:this={mapContainer} />
<PageAside>
    
</PageAside>

<style>
    .map-container {
        width: 100%;
        height: calc(100vh - 105px);
    }

    @media only screen and (max-width: 1000px){
        .map-container{
            height: 100%
        }
    }
</style>
