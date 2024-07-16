<script lang="ts">
    import { GamecenterRequestor } from "$lib/module/page/gamecenter/gamecenter";
    import type { Writable } from "svelte/store";

    export let favorites: Writable<number[]>;
    export let gamecenterOrder: number;

    $: favorite = $favorites.includes(gamecenterOrder);

    async function addFavorite() {
        const response = await GamecenterRequestor.addFavorite(gamecenterOrder);

        if (response.status === "success") {
            if(!favorite){
                $favorites = [...$favorites, gamecenterOrder];
            }
        }
    }

    async function deleteFavorite() {
        const response = await GamecenterRequestor.deleteFavorite(gamecenterOrder);

        if (response.status === "success") {
            if(favorite){
                $favorites = $favorites.filter(e => e !== gamecenterOrder);
            }
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
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 20px;
        height: 20px;

        box-sizing: border-box;
        /*border: 1px solid #ff7ac3;*/
        border-radius: 5px;
    }

    img {
        width: 18px;
        height: 18px;
    }
</style>
