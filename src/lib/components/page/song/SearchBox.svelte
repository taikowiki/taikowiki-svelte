<script lang="ts">
    import type { SongSearchOption } from "$lib/module/page/song/types";
    import SearchBoxDifficulty from "./SearchBox-Difficulty.svelte";
    import SearchBoxGenre from "./SearchBox-Genre.svelte";
    import SearchBoxInput from "./SearchBox-Input.svelte";
    import { page } from "$app/stores";
    import { pushState } from "$app/navigation";

    export let option: SongSearchOption;
    export let pageNum: number;

    let tempOption: SongSearchOption = structuredClone(option);

    let opened = false;

    function search() {
        option = structuredClone(tempOption);
        let searchParams = new URLSearchParams();
        if (option.query) {
            searchParams.append("query", option.query);
        }
        if (option.difficulty && option.level) {
            searchParams.append("difficulty", option.difficulty);
            searchParams.append("level", option.level.toString());
        }
        if (option.genre) {
            searchParams.append("genre", option.genre);
        }
        searchParams.append("page", pageNum.toString());

        if (
            !([...$page.url.searchParams.keys()].every(
                (key) =>
                    $page.url.searchParams.get(key) === searchParams.get(key),
            ) && [...$page.url.searchParams.keys()].length === [...searchParams.keys()].length)
        ) {
            const url = new URL($page.url.href);
            [...$page.url.searchParams.keys()].forEach((key) => {
                $page.url.searchParams.delete(key);
            });
            [...searchParams.keys()].forEach((key) => {
                url.searchParams.set(key, searchParams.get(key) as string);
                $page.url.searchParams.set(
                    key,
                    searchParams.get(key) as string,
                );
            });
            $page.url.searchParams.set("page", "1");
            url.searchParams.set("page", "1");
            pageNum = 1;
            pushState(url.href, $page.state);
        }
    }
</script>

<div class="wrapper">
    <div class="container">
        <SearchBoxInput bind:opened bind:tempOption {search} />
    </div>
    <div class="details-container" class:opened>
        <SearchBoxGenre bind:tempOption />
        <SearchBoxDifficulty bind:tempOption />
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
