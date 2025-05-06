<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import DocSideSearch from "$lib/components/page/wikidoc/view/DocSideSearch.svelte";
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

    const isMobile = getIsMobile();
</script>

{#if !page.url.pathname.startsWith('/doc/e') && page.url.pathname !== "/doc"}
    {#if $isMobile}
        <DocSideSearch {query} />
    {/if}
    <PageAside title="문서 검색">
        <DocSideSearch {query} />
    </PageAside>
{/if}

{@render children?.()}
