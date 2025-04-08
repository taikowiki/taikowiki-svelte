<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import PageSelector from "$lib/components/common/PageSelector.svelte";
    import { renderer } from "$lib/module/common/wikidoc/util.js";
    import { getTheme } from "$lib/module/layout/theme.js";
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

    function extractAccording(flattenedContent: string, query: string) {
        type P = {
            type: "normal" | "strong";
            value: string;
        };
        const extracted: P[][] = [];

        let searched = flattenedContent.indexOf(query);
        while (searched > -1) {
            const pArr: P[] = [];
            let range = 25;
            let pStart = Math.max(0, searched - range);
            let pEnd = Math.min(
                flattenedContent.length,
                searched + query.length + range,
            );

            let sliced = flattenedContent.slice(pStart, pEnd);
            if (pStart !== 0) {
                pArr.push({
                    type: "normal",
                    value: " ... ",
                });
            }
            sliced.split(query).forEach((v, i, a) => {
                pArr.push({
                    type: "normal",
                    value: v,
                });
                if (i !== a.length - 1) {
                    pArr.push({
                        type: "strong",
                        value: query,
                    });
                }
            });

            extracted.push(pArr);

            searched = flattenedContent.indexOf(
                query,
                searched + query.length + range,
            );
        }

        if(extracted.length === 0){
            return flattenedContent.slice(0, 200);
        }

        let totalLength = 0;
        let extractedString = "";
        for (const p of extracted) {
            let pString = "";
            let pLength = 0;
            p.forEach((e) => {
                if (e.type === "normal") {
                    pString += renderer.escapeHtml(e.value);
                } else {
                    pString += `<span class="em-query">${renderer.escapeHtml(e.value)}</span>`;
                }
                pLength += e.value.length;
            });
            if (totalLength + pLength > 250) {
                break;
            }
            extractedString += pString;
            totalLength += pLength;
        }

        extractedString += " ...";

        return extractedString;
    }

    function movePage(p: number) {
        const searchParams = new URLSearchParams(page.url.searchParams);
        searchParams.set("page", p.toString());
        goto(page.url.pathname + `?${searchParams.toString()}`);
    }

    const [theme] = getTheme();
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
                <div
                    class="search-result-content-container"
                    data-theme={$theme}
                >
                    {#if searchResult.songTitle}
                        <div class="redirect-container">
                            <img
                                src="/assets/icon/song.svg"
                                alt="song"
                                class="redirect-icon"
                                data-theme={$theme}
                            />{searchResult.songTitle ?? ""}
                        </div>
                    {/if}
                    {#if searchResult.flattenedContent}
                        <div class="search-result-container" data-theme={$theme}>
                            {@html extractAccording(
                                searchResult.flattenedContent,
                                query_ ?? "",
                            )}
                        </div>
                    {:else}
                        <div class="redirect-container">
                            <img
                                src="/assets/icon/document.svg"
                                alt="song"
                                class="redirect-icon"
                                data-theme={$theme}
                            />{searchResult.redirectTitle}
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
{/snippet}

<h1>
    <b>{query_ || "''"}</b>에 대한 검색 결과
</h1>
{#if data.count === 0 || data.searchResults.length === 0}
    검색 결과가 없습니다.
{:else}
    {@render searchResultsList(data.searchResults)}
    <PageSelector length={data.count} countPerPage={20} {pageNum} {movePage} />
{/if}

<style>
    h1 {
        font-weight: normal;
        font-size: 25px;
    }
    h2{
        font-size: 22px;
    }

    .search-results-container {
        padding: 0;
        display: flex;
        flex-direction: column;
        row-gap: 15px;
    }

    .search-result-content-container[data-theme="dark"] {
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

    .search-result-container {
        font-size: 14px;

        & :global(.em-query) {
            background: rgba(207, 72, 68, 0.3);
            border-radius: 5px;
            padding: 0px 1px;
        }

        &[data-theme="dark"] :global(.em-query) {
            background: rgba(225, 167, 67, 0.5);
        }
    }

    .redirect-icon {
        width: 18px;
        height: 18px;

        &[data-theme="dark"] {
            filter: invert(100%);
        }
    }
</style>
