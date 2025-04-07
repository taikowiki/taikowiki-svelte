<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import PageSelector from "$lib/components/common/PageSelector.svelte";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    let { data } = $props();

    type SearchResult = (typeof data)["searchResults"][number];

    const query_ = page.url.searchParams.get("query");
    let query = getContext("docSearchQuery") as Writable<string>;
    $query = query_ ?? $query;

    let pageNum = $state(parseInt(page.url.searchParams.get("page") || "1"));
    $effect.pre(() => {
        if (Number.isNaN(pageNum)) {
            pageNum = 1;
        }
    });

    function movePage(p: number) {
        const searchParams = new URLSearchParams(page.url.searchParams);
        searchParams.set("page", p.toString());
        goto(page.url.pathname + `?${searchParams.toString()}`);
    }
</script>

{#snippet searchResultsList(searchResults: SearchResult[])}
    <div class="search-results-container">
        {#each searchResults as searchResult}
            <div class="search-result-container">
                <h2 class="search-result-title">
                    <a
                        href={`/doc/r/${encodeURIComponent(searchResult.title)}`}
                    >
                        {searchResult.title}
                    </a>
                </h2>
                <div class="search-result-content-container">
                    {#if searchResult.songTitle}
                        <div class="redirect-container">
                            <img
                                src="/assets/icon/song.svg"
                                alt="song"
                                class="redirect-icon"
                            />{searchResult.songTitle ?? ""}
                        </div>
                    {/if}
                    {#if searchResult.flattenedContent}
                        <div class="search-result-container">
                            {searchResult.flattenedContent}
                        </div>
                    {:else}
                        <div class="redirect-container">
                            <img
                                src="/assets/icon/document.svg"
                                alt="song"
                                class="redirect-icon"
                            />{searchResult.redirectTitle}
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
{/snippet}

{#if data.count === 0 || data.searchResults.length === 0}
    검색 결과가 없습니다.
{:else}
    <h1>
        <b>{query_}</b>에 대한 검색 결과
    </h1>
    {@render searchResultsList(data.searchResults)}
    <PageSelector length={data.count} countPerPage={20} {pageNum} {movePage} />
{/if}

<style>
    h1 {
        font-weight: normal;
    }

    .search-results-container {
        padding: 0;
        display: flex;
        flex-direction: column;
        row-gap: 15px;
    }

    .search-result-content-container {
        color: white;
    }

    .search-result-title {
        margin: 0;
    }

    .redirect-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-weight: bold;

        &::before {
            content: "⤷";
            font-weight: bold;
            font-size: 18px;
            transform: translateY(-1px);
            margin-bottom: 5px;
        }
    }

    .redirect-icon {
        filter: invert(100%);
        width: 18px;
        height: 18px;
    }
</style>
