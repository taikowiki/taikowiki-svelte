<script lang="ts">
    import { goto } from "$app/navigation";
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";
    import { setContext, type Snippet } from "svelte";
    import { writable } from "svelte/store";

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();

    let query = writable("");
    setContext("docSearchQuery", query);

    const [theme] = getTheme();
    const isMobile = getIsMobile();

    function search(query: string) {
        goto(`/doc/search?query=${encodeURIComponent(query)}`);
    }
</script>

{#snippet searchView()}
    <div class="search-container" data-isMobile={$isMobile}>
        <input
            type="text"
            bind:value={$query}
            enterkeyhint="search"
            data-isMobile={$isMobile}
            onkeypress={(event) => {
                if (event.key === "Enter") {
                    search($query);
                }
            }}
        />
        <button
            class="standardbtn"
            data-theme={$theme}
            onclick={() => {
                search($query);
            }}
        >
            검색
        </button>
    </div>
{/snippet}

{#if $isMobile}
    {@render searchView()}
{/if}

{@render children?.()}

<PageAside title="문서 검색">
    {@render searchView()}
</PageAside>

<style>
    .search-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        &[data-isMobile="true"]{
            column-gap: 5px;
        }
        & input {
            width: 170px;
        }
        & input[data-isMobile="true"] {
            flex: 1 0 auto;
        }
    }
</style>
