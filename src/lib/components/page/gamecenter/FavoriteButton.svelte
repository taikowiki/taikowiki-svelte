<script lang="ts">
    import { gamecenterRequestor } from "$lib/module/common/gamecenter/gamecenter.client";
    import type { Writable } from "svelte/store";

    export let favorites: Writable<number[]>;
    export let gamecenterOrder: number;
    export let favoriteCount: number;

    $: favorite = $favorites.includes(gamecenterOrder);

    async function addFavorite() {
        const response = await gamecenterRequestor.addFavorite({gamecenterOrder});

        if (response.status === "success") {
            if(!favorite){
                $favorites = [...$favorites, gamecenterOrder];
            }
            favoriteCount = favoriteCount + 1;
        }
    }

    async function deleteFavorite() {
        const response = await gamecenterRequestor.deleteFavorite({gamecenterOrder});

        if (response.status === "success") {
            if(favorite){
                $favorites = $favorites.filter(e => e !== gamecenterOrder);
            }
            favoriteCount = Math.max(favoriteCount - 1, 0)
        }
    }
</script>

<div
    class="container"
    role="presentation"
    on:click|stopPropagation={() => {
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
