<script lang="ts">
    import { goto } from "$app/navigation";
    import { mainpageDocSearch } from "$lib/module/common/search/search.client";
    import type { SearchResult } from "$lib/module/common/search/types";
    import { getTheme } from "$lib/module/layout/theme";
    import { onDestroy, onMount } from "svelte";
    import MainSearchResult from "../../(index)/MainSearchResult.svelte";

    let keyword = $state("");

    //빠른 검색 관련
    let searchResults: SearchResult[] = $state([]);
    let searchInterval = $state<ReturnType<typeof setInterval>>();
    let searchDelay: number | null = $state(null);
    onMount(() => {
        searchInterval = setInterval(() => {
            if (searchDelay === null) return;
            if (searchDelay === 0) {
                quickSearch(keyword);
                searchDelay = null;
            } else {
                searchDelay--;
            }
        }, 200);
    });
    onDestroy(() => {
        if (searchInterval) {
            clearInterval(searchInterval);
        }
    });
    // 검색 결과들을 보여줄 지 여부
    let searchResultsOpened = $state(false);
    let searchBox = $state<HTMLDivElement>();

    const [theme] = getTheme();

    async function quickSearch(keyword: string) {
        const response = await mainpageDocSearch(keyword);
        if (response.status === "success") {
            searchResults = response.data;
        }
    }
    function search(query: string) {
        goto(`/doc/search?query=${encodeURIComponent(query)}`);
    }
    function searchBoxFocusOut(event: FocusEvent) {
        if (
            event.relatedTarget instanceof Node &&
            searchBox?.contains(event.relatedTarget)
        )
            return;
        searchResultsOpened = false;
    }
</script>

<div class="search-box-container">
    <img src="/assets/img/doc_main.png" alt="doc-main" />
    <div
        class="search-box"
        data-theme={$theme}
        bind:this={searchBox}
        onfocusout={searchBoxFocusOut}
    >
        <input
            type="text"
            bind:value={keyword}
            placeholder="검색어"
            oninput={() => {
                searchDelay = 1;
                searchResultsOpened = true;
            }}
            onclick={() => {
                searchResultsOpened = true;
            }}
            onkeypress={(event) => {
                if (event.key === "Enter") {
                    search(keyword);
                }
            }}
        />
        <button
            onclick={() => {
                search(keyword);
            }}
            aria-label="search"
        >
            <img src="/assets/icon/search.svg" alt="" />
        </button>
        {#if searchResultsOpened}
            <div class="search-result-container">
                <MainSearchResult {searchResults} opened={searchResultsOpened}/>
            </div>
        {/if}
    </div>
</div>

<style>
    .search-box-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        & > img {
            width: 250px;
            height: auto;
            max-height: 100%;
        }

        & .search-box {
            width: 500px;
            height: 40px;
            max-width: 100%;

            box-sizing: border-box;

            display: flex;
            flex-direction: row;

            & input {
                flex: 1 0 auto;
                height: 100%;
                box-sizing: border-box;
                border: 3px solid #cf4844;
                font-size: 17px;
                padding-inline: 5px;

                border-radius: 5px 0px 0px 5px;

                &:focus {
                    outline: 0;
                }
            }
            & button {
                width: 40px;
                height: 40px;
                font-size: 20px;
                background-color: #cf4844;
                border: 0;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 0px 5px 5px 0px;

                & img {
                    width: 20px;
                    height: 20px;
                    filter: invert(100%);
                }
            }
        }

        & .search-box[data-theme="dark"] {
            & input {
                border-color: #000000;
                background-color: inherit;
                color: white;
            }
            & button {
                background-color: #000000;
            }
        }
    }

    .search-box {
        position: relative;

        & .search-result-container {
            width: calc(100% - 6px - 40px);

            background-color: red;
            color: white;
            position: absolute;
            top: 100%;
            left: 3px;
        }
    }
</style>
