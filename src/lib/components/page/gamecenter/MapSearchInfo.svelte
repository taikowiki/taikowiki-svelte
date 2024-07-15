<script lang="ts">
    import type { GameCenterData } from "$lib/module/common/gamecenter/types";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getTheme } from "$lib/module/layout/theme";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import FavoriteButton from "./FavoriteButton.svelte";

    export let gamecenterData: GameCenterData;
    export let clickHandle: () => any;
    export let distance: number | undefined;
    export let favorites: number[];

    const lang = getLang();
    $: i18n = getI18N("/gamecenter", $lang);

    const [theme] = getTheme();

    const naverLink = `https://map.naver.com/p/search/${encodeURIComponent(gamecenterData.address)}`;
    const kakaoLink = `https://map.kakao.com/link/search/${gamecenterData.address}`;

    const user: Writable<{logined: boolean; nickname: string;}> = getContext('user');
</script>

<div class="container" on:click={clickHandle} role="presentation">
    <div class="name">
        {gamecenterData.name}
    </div>
    <div class="address">
        {gamecenterData.address}
    </div>
    <div class="amenity-container">
        {#each Object.entries(gamecenterData.amenity).filter(([_, value]) => value) as [amenity]}
            <div class="amenity" data-theme={$theme}>
                <span class="text">
                    {i18n.amenity[amenity]}
                </span>
            </div>
        {/each}
    </div>
    <div class="distance-container">
        <div class="distance">
            {#if distance}
                <span class="text">
                    {Math.round(distance / 10) / 100}km
                </span>
            {/if}
        </div>
        <div class="maplink-container">
            <a class="maplink kakao" href={kakaoLink}>
                <span class="text"> K </span>
            </a>
            <a class="maplink naver" href={naverLink}>
                <span class="text"> N </span>
            </a>
            {#if $user.logined}
                <FavoriteButton favorite={favorites.includes(gamecenterData.order)} gamecenterOrder={gamecenterData.order}/>
            {/if}
        </div>
    </div>
</div>

<style>
    .container {
        width: 100%;

        border: 1px solid rgb(189, 189, 189);
        border-radius: 5px;

        cursor: pointer;

        box-sizing: border-box;

        padding-inline: 3px;
    }

    .name {
        font-size: 17px;
        font-weight: bold;

        display: flex;
    }

    .address {
        font-size: 13px;
        line-height: 13px;
        color: rgb(114, 114, 114);
    }

    .amenity-container {
        display: flex;
        flex-wrap: wrap;

        row-gap: 2px;
        column-gap: 2px;

        margin-top: 5px;
    }
    .amenity {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 20px;

        border: 1px solid rgb(189, 189, 189);
        border-radius: 50vh;
        box-sizing: border-box;

        padding-inline: 5px;

        font-size: 14px;
    }
    .amenity[data-theme="dark"] {
        background-color: #1c1c1c;
        border-color: rgba(0, 0, 0, 0);
    }

    .distance-container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-top: 5px;
        margin-bottom: 3px;
    }
    .distance {
        border: 1px solid rgb(189, 189, 189);
        border-radius: 5px;

        display: flex;
        justify-content: center;
        align-items: center;

        padding-inline: 5px;
    }

    .maplink-container {
        display: flex;
        justify-content: center;

        column-gap: 5px;
    }
    .maplink {
        width: 20px;
        height: 20px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-weight: bold;

        border-radius: 3px;

        text-decoration: none;
    }
    .kakao {
        background-color: #fae100;
        color: black;
    }
    .naver {
        background-color: #05c046;
        color: white;
    }

    .text {
        transform: translateY(-1px);
    }
</style>
