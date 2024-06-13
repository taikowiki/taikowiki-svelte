<script lang="ts">
    import type { SongSearchOption } from "$lib/module/common/song/types";
    import SearchBoxDifficulty from "./SearchBox-Difficulty.svelte";
    import SearchBoxGenre from "./SearchBox-Genre.svelte";
    import SearchBoxInput from "./SearchBox-Input.svelte";

    export let option: SongSearchOption;

    export let opened = false;
</script>

<div class="wrapper">
    <div class="container">
        <SearchBoxInput bind:opened bind:option/>
    </div>
    <div class="details-container" class:opened>
        <SearchBoxGenre bind:option />
        <SearchBoxDifficulty bind:option />
    </div>
</div>

<style>
    .wrapper {
        width: 100%;

        display: flex;
        flex-direction: column;
    }

    /*
    @media only screen and (max-width: 1000px) {
        .wrapper {
            display: none;
        }
    }
    */

    .container {
        width: 100%;

        box-sizing: border-box;

        display: flex;
    }

    .details-container {
        width: 0;
        max-height: 0;

        overflow: hidden;
        display: flex;
        flex-direction: column;

        row-gap: 5px;
        padding-block: 5px;

        box-sizing: border-box;

        transition:
            width 0.2s,
            max-height 0.2s;
    }
    .details-container.opened {
        width: 100%;
        max-height: 400px;
    }
</style>
