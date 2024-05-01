<script lang="ts">
    import type { SongSearchOption } from "$lib/module/page/song/types";
    import SearchBoxPcDifficulty from "./SearchBox-Pc-Difficulty.svelte";
    import SearchBoxPcGenre from "./SearchBox-Pc-Genre.svelte";
    import SearchBoxPcInput from "./SearchBox-Pc-Input.svelte";
    import SearchBox from "./SearchBox.svelte";

    export let option: SongSearchOption;

    let tempOption: SongSearchOption = {};

    let opened = false;

    function search() {
        option = structuredClone(tempOption);
    }
</script>

<div class="wrapper">
    <div class="container">
        <SearchBoxPcInput bind:opened bind:tempOption {search} />
    </div>
    <div class="details-container" class:opened>
        <SearchBoxPcGenre bind:tempOption />
        <SearchBoxPcDifficulty bind:tempOption />
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
