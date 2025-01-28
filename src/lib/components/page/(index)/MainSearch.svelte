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

    let keyword: string = $state("");
    let searchType: "all" | "song" | "docs" = $state("song");

    let selectorOpened: boolean = $state(false);

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
    $effect(() => {
        if (searchType !== "song") {
            searchType = "song";
            alert("공사중입니다.");
        }
    });

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
    let searchResults: SearchResult[] = $state([]);
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
    let searchResultOpened: boolean = $state(false);
    let inputContianer = $state<HTMLDivElement>();

    const [theme] = getTheme();

    /**
     * 검색 페이지로 이동동
     * 엔터키 / 검색 버튼 눌렀을 때 실행
     */
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

    /**
     * input에서 focus가 벗어났을 때 실행
     * @param event
     */
    function inputFocusOut(event: FocusEvent) {
        if (
            event.relatedTarget instanceof Node &&
            inputContianer?.contains(event.relatedTarget)
        )
            return;
        searchResultOpened = false;
    }
</script>

{#snippet searchInput()}
    <input
        type="search"
        enterkeyhint="search"
        bind:value={keyword}
        data-theme={$theme}
        oninput={() => {
            searchDelay = 1;
        }}
        onclick={() => {
            searchResultOpened = true;
        }}
        onkeypress={(event) => {
            if (event.key === "Enter") {
                search();
            }
        }}
    />
{/snippet}
{#snippet searchBtn()}
    <button
        class="search-btn"
        data-theme={$theme}
        onclick={search}
        aria-label="search"
    ></button>
{/snippet}

<Container theme={$theme} {selectorOpened}>
    <MainSearchTypeSelector bind:searchType bind:opened={selectorOpened} />
    <div
        class="input-container"
        data-theme={$theme}
        bind:this={inputContianer}
        onfocusout={inputFocusOut}
    >
        {@render searchInput()}
        <MainSearchResult {searchResults} bind:opened={searchResultOpened} />
    </div>
    {@render searchBtn()}
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
