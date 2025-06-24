<script lang="ts">
    import { Gamecenter } from "$lib/module/gamecenter";
    import "$lib/module/gamecenter/gamecenter.client";
    import type { Writable } from "svelte/store";

    interface Props {
        favorites: Writable<number[]>;
        gamecenterOrder: number;
        favoriteCount: number;
    }

    let {favorites, gamecenterOrder, favoriteCount = $bindable()}: Props = $props();

    let favorite = $derived($favorites.includes(gamecenterOrder));

    async function addFavorite() {
        const response = await Gamecenter.Client.request.addFavorite({
            gamecenterOrder,
        });

        if (response.status === "success") {
            favoriteCount = favoriteCount + 1;
            if (!favorite) {
                $favorites = [...$favorites, gamecenterOrder];
            }
        }
    }

    async function deleteFavorite() {
        const response = await Gamecenter.Client.request.deleteFavorite({
            gamecenterOrder,
        });

        if (response.status === "success") {
            favoriteCount = Math.max(favoriteCount - 1, 0);
            if (favorite) {
                $favorites = $favorites.filter((e) => e !== gamecenterOrder);
            }
        }
    }
</script>

<div
    class="container"
    role="presentation"
    onclick={(event) => {
        event.stopPropagation();
        favorite ? deleteFavorite() : addFavorite();
    }}
>
    {#if favorite}
        <img src="/assets/icon/map/favorite-on.svg" alt="favorite-on" />
    {:else}
        <img src="/assets/icon/map/favorite-off.svg" alt="favorite-off" />
    {/if}
    <div class="favorite-count">
        {favoriteCount}
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 30px;
        height: 20px;

        box-sizing: border-box;
        /*border: 1px solid #ff7ac3;*/
        border-radius: 5px;
    }

    img {
        width: 18px;
        height: 18px;
    }

    .favorite-count {
        width: 12px;
        height: 20px;

        display: flex;
        justify-content: center;
        align-items: center;

        transform: translateY(-1px);

        font-size: 15px;
    }
</style>
