<script lang="ts">
    import styled from "styled-svelte5";
    import { Row } from "../../common/styled";
    import MainSearchTypeSelector from "./MainSearchTypeSelector.svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import { onDestroy, onMount } from "svelte";
    import { mainpageSongSearch } from "$lib/module/common/search/search.client";
    import type { SearchResult } from "$lib/module/common/search/types";
    import MainSearchResult from "./MainSearchResult.svelte";
    import { goto } from "$app/navigation";

    let keyword: string = "";
    let searchType: "all" | "song" | "docs" = "song";

    let selectorOpened: boolean = false;

    const Container = styled<{
        theme: "light" | "dark";
        selectorOpened: boolean;
    }>(
        "div",
        ({ theme }) => `
        ${Row.center.styledComponentData.generateCommonStyle({})}
        width: min(700px, 100%);
        height: 40px;
        border: ${theme === "light" ? "1px solid #cf4844" : "1px solid gray"};
        ${theme === "light" ? "" : " background-color: #1c1c1c;"}
        ${selectorOpened ? "border-radius: 5px 5px 5px 0px;" : "border-radius: 5px;"}
        `,
    );

    /**
     * @todo 문서 기능 개발 후 삭제
     */
    $: if (searchType !== "song") {
        searchType = "song";
        alert("공사중입니다.");
    }

    //빠른 검색 관련
    let searchInterval: ReturnType<typeof setInterval>;
    let searchDelay: number | null = null;
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
    let searchResults: SearchResult[] = [];
    async function quickSearch(keyword: string) {
        searchResults = [];
        switch (searchType) {
            case "song": {
                const response = await mainpageSongSearch(keyword);
                if (response.status === "success") {
                    searchResults = response.data;
                }
                break;
            }
        }
    }
    let searchResultOpened: boolean = false;
    let inputContianer: HTMLDivElement;

    //검색
    function search() {
        switch (searchType) {
            case "song": {
                const searchParams = new URLSearchParams();
                searchParams.set("query", keyword);
                goto(`/song?${searchParams.toString()}`);
                break;
            }
        }
    }

    const [theme] = getTheme();
</script>

<Container theme={$theme} {selectorOpened}>
    <MainSearchTypeSelector bind:searchType bind:opened={selectorOpened} />
    <div
        class="input-container"
        data-theme={$theme}
        bind:this={inputContianer}
        on:focusout={(event) => {
            if (
                event.relatedTarget instanceof Node &&
                inputContianer?.contains(event.relatedTarget)
            )
                return;
            searchResultOpened = false;
        }}
    >
        <input
            type="search"
            enterkeyhint="search"
            bind:value={keyword}
            data-theme={$theme}
            on:input={() => {
                searchDelay = 1;
            }}
            on:click={() => {
                searchResultOpened = true;
            }}
            on:keypress={(event) => {
                if (event.key === "Enter") {
                    search();
                }
            }}
        />
        <MainSearchResult {searchResults} bind:opened={searchResultOpened} />
    </div>
    <button class="search-btn" data-theme={$theme} on:click={search} aria-label="search"></button>
</Container>

<style>
    .input-container {
        width: calc(100% - 88px);
        height: 100%;

        border-left: 1px solid #cf4844;
        border-right: 1px solid #cf4844;
        box-sizing: border-box;
    }
    .input-container[data-theme="dark"] {
        border-left-color: gray;
        border-right-color: gray;
    }

    input {
        width: 100%;
        height: 100%;
        border: 0;
        outline: 0;
        font-size: 16px;
        font-weight: bold;

        padding-inline: 5px;
    }
    input[data-theme="dark"] {
        color: white;
        background-color: #1c1c1c;
    }

    button.search-btn {
        background: transparent url("/assets/icon/search.svg");
        background-size: 50%;
        background-repeat: no-repeat;
        background-position: center center;

        width: 40px;
        height: 40px;

        border: 0;
        outline: 0;
        border-radius: 5px;
        cursor: pointer;
    }
    button.search-btn[data-theme="dark"] {
        filter: invert(100%);
    }
</style>
