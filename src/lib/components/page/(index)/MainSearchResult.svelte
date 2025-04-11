<script lang="ts">
    import type { SearchResult } from "$lib/module/common/search/types";
    import { getTheme } from "$lib/module/layout/theme";

    interface Props {
        searchResults: SearchResult[];
        opened?: boolean;
    }

    let { searchResults, opened = $bindable(false) }: Props = $props();

    function getTypeImgSrc(searchType: "song" | "docs") {
        switch (searchType) {
            case "song": {
                return "/assets/icon/song.svg";
            }
            case "docs": {
                return "/assets/icon/document.svg";
            }
        }
    }

    function getHref(searchResult: SearchResult) {
        switch (searchResult.type) {
            case "song": {
                return `/song/${searchResult.songNo}`;
            }
            case "docs": {
                return `/doc/r/${encodeURIComponent(searchResult.title)}`;
            }
        }
    }

    const [theme] = getTheme();
</script>

{#snippet searchResultView(searchResult: SearchResult)}
    {@const { type, title } = searchResult}
    <a class="searchresult" data-theme={$theme} href={getHref(searchResult)} tabindex="0">
        <img
            class="type-img"
            alt={type}
            src={getTypeImgSrc(type)}
            data-theme={$theme}
        />
        <span class="title">
            {title}
        </span>
    </a>
{/snippet}

<div
    class="searchresult-container"
    class:closed={!(opened && searchResults.length > 0)}
    data-theme={$theme}
>
    {#each searchResults.slice(0, 10) as searchResult}
        {@render searchResultView(searchResult)}
    {/each}
</div>

<style>
    .searchresult-container {
        width: 100%;

        box-sizing: border-box;
        outline: 1px solid #cf4844;
        margin-top: 1px;

        display: flex;
        flex-direction: column;

        position: relative;
        z-index: 2;

        background-color: white;

        &.closed {
            display: none;
        }
    }
    .searchresult-container[data-theme="dark"] {
        outline-color: gray;
        background-color: #1c1c1c;
    }

    .searchresult {
        width: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;

        column-gap: 2px;
        padding-inline: 5px;

        box-sizing: border-box;

        cursor: pointer;
        color: black;
    }
    .searchresult:not(:nth-last-child(1)) {
        border-bottom: 1px solid #cf4844;
        &[data-theme="dark"] {
            border-color: gray;
        }
    }
    .searchresult:hover {
        background-color: #ffe4e4;
        &[data-theme="dark"] {
            background-color: rgb(83, 83, 83);
        }
    }
    .searchresult[data-theme="dark"] {
        color: white;
    }

    .type-img {
        width: 15px;
        height: 15px;
        filter: brightness(0) saturate(100%) invert(34%) sepia(22%)
            saturate(4162%) hue-rotate(332deg) brightness(87%) contrast(83%);
    }
    .type-img[data-theme="dark"] {
        filter: invert(100%);
    }

    .title {
        transform: translateY(-1px);
    }
</style>
