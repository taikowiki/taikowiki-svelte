<script lang="ts">
    import type { GameCenterData } from "$lib/module/page/gamecenter/types";

    export let gamecenterData: GameCenterData;

    const naverLink = `https://map.naver.com/p/search/${encodeURIComponent(gamecenterData.address)}`;
    const kakaoLink = `https://map.kakao.com/link/search/${gamecenterData.address}`;
</script>

<div class="container">
    <div class="name">
        {gamecenterData.name}
    </div>
    <div class="address">
        {gamecenterData.address}
    </div>

    <div class="map-link-container">
        <a class="map-link kakao-link" href={kakaoLink} target='_blank'> 카카오맵 </a>
        <a class="map-link naver-link" href={naverLink} target='_blank'> 네이버맵 </a>
    </div>
</div>

<style>
    .container {
        width: 100%;
        height: auto;

        display: flex;
        justify-content: center;
        flex-direction: column;

        padding-inline: 5px;
        padding-block: 3px;
        box-sizing: border-box;

        color: black;
    }

    .name {
        font-weight: bold;
        font-size: 18px;
    }

    .address {
        font-size: 13px;
        color: rgb(114, 114, 114);
        line-height: 14px;
    }

    .map-link-container {
        width: 100%;

        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;
        margin-bottom: 3px;
    }

    .map-link {
        width: 90px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;

        text-decoration: none;

        font-weight: bold;

        border-radius: 5px;
    }
    .kakao-link {
        background-color: #fae100;
        color:black;
    }
    .naver-link {
        background-color: #05c046;
        color:white;
    }
</style>
