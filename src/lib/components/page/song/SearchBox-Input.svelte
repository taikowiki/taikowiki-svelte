<script lang="ts">
    import type { SongSearchOption } from "$lib/module/page/song/types";
    import { getTheme } from "$lib/module/layout/theme";

    export let opened: boolean;
    export let tempOption: SongSearchOption;
    export let search: () => void;

    function open() {
        opened = !opened;
    }

    const [theme] = getTheme();
</script>

<div class="search-container" data-theme={$theme}>
    <button class="search-detail-toggler" on:click={open} class:opened>
        <span>▲</span>
    </button>
    <input
        class="search-input"
        type="text"
        bind:value={tempOption.query}
        placeholder="검색어"
        on:keypress={(event) => {
            if (event.key === "Enter") {
                search();
            }
        }}
        enterkeyhint="search"
        data-theme={$theme}
    />
    <button class="search-button" on:click={search}>
        <img src="/assets/icon/search.svg" alt="" />
    </button>
</div>

<style>
    .search-container {
        width: 100%;
        height: 40px;

        display: flex;

        border-radius: 5px;
        overflow: hidden;
    }
    .search-detail-toggler {
        width: 40px;
        height: 40px;

        font-size: 20px;

        background-color: #cf4844;
        color: white;
        border: 0;

        cursor: pointer;
    }
    .search-detail-toggler > span {
        display: block;
        transform: rotate(90deg);
        transition: transform 0.2s;
    }
    .search-detail-toggler.opened > span {
        display: block;
        transform: rotate(180deg);
    }

    .search-input {
        width: calc(100% - 80px);
        height: 100%;

        box-sizing: border-box;

        border: 3px solid #cf4844;

        font-size: 17px;
        padding-inline: 5px;
    }
    .search-input:focus {
        outline: 0;
    }
    .search-input[data-theme="dark"] {
        color: inherit;
        background-color: inherit;
    }

    .search-button {
        width: 40px;
        height: 40px;

        font-size: 20px;

        background-color: #cf4844;
        border: 0;

        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search-button > img {
        width: 20px;
        height: 20px;

        filter: invert(100%);
    }

    .search-container[data-theme="dark"] > .search-detail-toggler {
        background-color: black;
    }
    .search-container[data-theme="dark"] > .search-input {
        border-color: black;
    }
    .search-container[data-theme="dark"] > .search-input::placeholder {
        color:white;
        opacity: 0.7;
    }
    .search-container[data-theme="dark"] > .search-button {
        background-color: black;
    }
</style>
