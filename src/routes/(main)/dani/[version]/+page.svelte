<script lang="ts">
    import DaniDisplay from "$lib/components/page/dani/DaniDisplay.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    export let data;

    const {daniData, songDatas} = data;
</script>

<div class="container">
    {#each daniData.data as dani}
        <DaniDisplay {dani} {songDatas} />
    {/each}
    {#if daniData.data.length % 2 === 1}
        <div class="dummy"/>
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;

        row-gap: 20px;
    }

    .dummy{
        width: 400px;
    }

    @media only screen and (max-width: 1000px) {
        .container {
            flex-direction: column;
            justify-content: center;
        }
    }
</style>
