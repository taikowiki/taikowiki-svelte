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
    export let favorites: Writable<number[]>;

    const lang = getLang();
    $: i18n = getI18N("/gamecenter", $lang);

    const [theme] = getTheme();

    const naverLink = `https://map.naver.com/p/search/${encodeURIComponent(gamecenterData.address)}`;
    const kakaoLink = `https://map.kakao.com/link/search/${gamecenterData.address}`;

    const user: Writable<{ logined: boolean; nickname: string }> =
        getContext("user");

    const today = new Date().getDay();

    let showOtherDayBusinessHours = false;
    let showMachines = false;
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
    <div class="machines-container">
        <div
            class="machines-opener"
            on:click|stopPropagation={() => {
                showMachines = !showMachines;
            }}
            role="presentation"
            class:hidden={!showMachines}
        >
            기체 정보
        </div>
        <table class="machines" class:hidden={!showMachines}>
            <tr>
                <th> {i18n.price} </th>
                <th> {i18n.tunes} </th>
                <th> {i18n.count} </th>
            </tr>
            {#each gamecenterData.machines as machine}
                <tr>
                    <td>
                        {machine.price}원
                    </td>
                    <td>
                        {machine.tunes}곡
                    </td>
                    <td>
                        {machine.count}대
                    </td>
                </tr>
            {/each}
        </table>
    </div>
    <div class="hours-container">
        <div
            class="today"
            on:click|stopPropagation={() => {
                showOtherDayBusinessHours = !showOtherDayBusinessHours;
            }}
            role="presentation"
            class:hidden={!showOtherDayBusinessHours}
        >
            <span>
                ({i18n.date[today]}) {gamecenterData.businessHours[today]}
            </span>
        </div>
        <div class="other-day" class:shown={showOtherDayBusinessHours}>
            {#each [0, 1, 2, 3, 4, 5, 6] as day}
                <div>
                    ({i18n.date[day]}) {gamecenterData.businessHours[day]}
                </div>
            {/each}
        </div>
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
            <a class="maplink kakao" href={kakaoLink} target="_blank">
                <span class="text"> K </span>
            </a>
            <a class="maplink naver" href={naverLink} target="_blank">
                <span class="text"> N </span>
            </a>
            {#if $user.logined}
                <FavoriteButton
                    {favorites}
                    gamecenterOrder={gamecenterData.order}
                    favoriteCount={gamecenterData.favoriteCount}
                />
            {:else}
                <div class="favorite-count">
                    {gamecenterData.favoriteCount}
                </div>
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

    .today {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 15px;
    }
    .today::after {
        content: "▲";
    }
    .today.hidden::after {
        content: "▼";
    }
    .other-day {
        display: none;
        flex-direction: column;

        font-size: 13px;
    }
    .other-day.shown {
        display: flex;
    }

    .machines-opener {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 15px;
    }
    .machines-opener::after {
        content: "▲";
    }
    .machines-opener.hidden::after {
        content: "▼";
    }
    .machines {
        width: 100%;
        font-size: 15px;
        border-collapse: collapse;
    }
    .machines.hidden {
        display: none;
    }
    .machines td,
    th {
        border: 1px solid gray;
        text-align: center;
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

    .favorite-count {
        width: 8px;
        height: 20px;

        display: flex;
        justify-content: center;
        align-items: center;

        transform: translateY(-1px);

        font-size: 15px;
    }
</style>
