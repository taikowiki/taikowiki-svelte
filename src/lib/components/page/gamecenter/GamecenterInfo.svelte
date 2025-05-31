<script lang="ts">
    import type { Gamecenter } from "$lib/module/gamecenter";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getTheme } from "$lib/module/layout/theme";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import FavoriteButton from "./FavoriteButton.svelte";

    interface Props {
        gamecenterData: Gamecenter.Gamecenter;
        clickHandle: () => any;
        distance?: number;
        favorites: Writable<number[]>;
    }

    let {
        gamecenterData = $bindable(),
        clickHandle,
        distance,
        favorites,
    }: Props = $props();

    const lang = getLang();
    let i18n = $derived(getI18N("/gamecenter", $lang));
    let newI18n = $derived(getI18N($lang).page.gamecenter);

    const [theme] = getTheme();

    const naverLink = `https://map.naver.com/p/search/${encodeURIComponent(gamecenterData.address)}`;
    const kakaoLink = `https://map.kakao.com/link/search/${gamecenterData.address}`;

    const user: Writable<{ logined: boolean; nickname: string }> =
        getContext("user");

    const today = new Date().getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6;

    let showOtherDayBusinessHours = $state(false);
    let showMachines = $state(false);
</script>

{#snippet name()}
    <div class="name">
        {gamecenterData.name}
    </div>
{/snippet}
{#snippet address()}
    <div class="address">
        {gamecenterData.address}
    </div>
{/snippet}
{#snippet amenity()}
    <div class="amenity-container">
        {#each Object.entries(gamecenterData.amenity).filter(([_, value]) => value) as [amenity]}
            <div class="amenity" data-theme={$theme}>
                <span class="text">
                    {i18n.amenity[amenity]}
                </span>
            </div>
        {/each}
    </div>
{/snippet}
{#snippet machines()}
    <div class="machines-container">
        <div
            class="machines-opener"
            onclick={(event) => {
                event.stopPropagation();
                showMachines = !showMachines;
            }}
            role="presentation"
            class:hidden={!showMachines}
        >
            {newI18n.machineInfo}
        </div>
        <div class="div-table machines" class:hidden={!showMachines}>
            <div class="div-tr">
                <div class="div-th">{i18n.price}</div>
                <div class="div-th">{i18n.tunes}</div>
                <div class="div-th">{i18n.count}</div>
            </div>
            {#each gamecenterData.machines as machine}
                <div class="div-tr">
                    <div class="div-td">
                        {machine.price}원
                    </div>
                    <div class="div-td">
                        {machine.tunes}곡
                    </div>
                    <div class="div-td">
                        {machine.count}대
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/snippet}
{#snippet businessHours()}
    <div class="hours-container">
        <div
            class="today"
            onclick={(event) => {
                event.stopPropagation();
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
            {#each ([0, 1, 2, 3, 4, 5, 6] as const) as day}
                <div>
                    ({i18n.date[day]}) {gamecenterData.businessHours[day]}
                </div>
            {/each}
        </div>
    </div>
{/snippet}
{#snippet distanceView()}
    <div class="distance">
        {#if distance}
            <span class="text">
                {Math.round(distance / 10) / 100}km
            </span>
        {/if}
    </div>
{/snippet}
{#snippet mapLink()}
    <a class="maplink kakao" href={kakaoLink} target="_blank">
        <span class="text"> K </span>
    </a>
    <a class="maplink naver" href={naverLink} target="_blank">
        <span class="text"> N </span>
    </a>
{/snippet}
{#snippet favorite()}
    {#if $user.logined}
        <FavoriteButton
            {favorites}
            gamecenterOrder={gamecenterData.order}
            bind:favoriteCount={gamecenterData.favoriteCount}
        />
    {:else}
        <div class="favorite-count">
            {gamecenterData.favoriteCount}
        </div>
    {/if}
{/snippet}

<div class="container" onclick={clickHandle} role="presentation">
    {@render name()}
    {@render address()}
    {@render amenity()}
    {@render machines()}
    {@render businessHours()}
    <div class="distance-container">
        {@render distanceView()}
        <div class="maplink-container">
            {@render mapLink()}
            {@render favorite()}
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
    .machines .div-td,
    .div-th {
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
