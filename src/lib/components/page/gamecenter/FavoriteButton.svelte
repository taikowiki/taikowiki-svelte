<script lang="ts">
    import { GamecenterRequestor } from "$lib/module/common/gamecenter/gamecenter";

    export let favorite: boolean = false;
    export let gamecenterOrder: number;

    async function addFavorite() {
        const response = await GamecenterRequestor.addFavorite(gamecenterOrder);

        if (response.status === "success") {
            favorite = true;
        }
    }

    async function deleteFavorite() {
        const response = await GamecenterRequestor.deleteFavorite(gamecenterOrder);

        if (response.status === "success") {
            favorite = false;
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
    }

    img {
        width: 20px;
        height: 20px;
    }
</style>
