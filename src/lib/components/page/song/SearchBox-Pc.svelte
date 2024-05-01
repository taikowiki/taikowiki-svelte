<script lang="ts">
    import type { SearchOption } from "$lib/module/page/song/types";

    export let option: SearchOption;

    let optionCandidate: SearchOption = {};

    let opened = false;
    function open() {
        opened = !opened;
    }

    function search() {
        option = structuredClone(optionCandidate);
    }
</script>

<div class="wrapper">
    <div class="container">
        <div class="search-container">
            <button class="search-detail-toggler" on:click={open} class:opened>
                <span>▲</span>
            </button>
            <input
                class="search-input"
                type="text"
                bind:value={optionCandidate.query}
                placeholder="검색"
                on:keypress={(event) => {
                    if(event.key === "Enter"){
                        search();
                    }
                }}
            />
            <button class="search-button" on:click={search}/>
        </div>
    </div>
</div>

<style>
    .wrapper {
        width: 100%;

        display: flex;
        justify-content: center;
    }

    .container {
        width: 100%;

        box-sizing: border-box;
    }

    .search-container {
        width: 100%;
        height: 40px;

        display: flex;
    }
    .search-detail-toggler {
        width: 40px;
        height: 40px;

        font-size: 20px;

        background-color: #cf4844;
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

        border: 1px solid #cf4844;

        font-size: 17px;
        padding-inline: 5px;
    }
    .search-input:focus {
        border: 2px solid #cf4844;
        outline: 0;
    }

    .search-button {
        width: 40px;
        height: 40px;

        font-size: 20px;

        background-color: #cf4844;
        border: 0;

        cursor: pointer;

        background-image: url('/assets/icon/search.svg');
        background-size: 20px 20px;
        background-repeat: no-repeat;
        background-position: center;
    }
</style>
