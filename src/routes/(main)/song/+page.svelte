<script lang="ts" context="module">
    function getPageNumFromUrl(url?: URL) {
        let searchParams;
        if (url) {
            searchParams = new URLSearchParams(url.search);
        } else {
            searchParams = new URLSearchParams(location.search);
        }

        const page = searchParams.get("page");
        const pageNum = Number(page);
        if (page && pageNum && !isNaN(pageNum)) {
            return pageNum;
        }
        return 1;
    }
</script>

<script lang="ts">
    import { type SongLang } from "$lib/module/common/song/types";
    import SearchBoxContainer from "$lib/components/page/song/SearchBoxContainer.svelte";
    import SongLanguageSelector from "$lib/components/page/song/SongLanguageSelector.svelte";
    import type { SongData } from "$lib/module/common/song/types";
    import SongList from "$lib/components/page/song/SongList.svelte";
    import PageSelector from "$lib/components/page/song/PageSelector.svelte";
    import { page } from "$app/stores";
    import SongLoading from "$lib/components/page/song/SongLoading.svelte";

    export let data;

    let filteredSongs: (SongData & { order: number })[] | null = null;

    let songLang: SongLang;

    let pageNum = getPageNumFromUrl($page.url);
    $: if ($page.state) {
        pageNum = getPageNumFromUrl();
    }

    const songs = data.songs
</script>

<SearchBoxContainer {songs} bind:filteredSongs />
<SongLanguageSelector bind:songLang />
{#if filteredSongs === null}
    <SongLoading />
{:else}
    <SongList
        {songLang}
        filteredSongs={filteredSongs.slice(
            Math.min((pageNum - 1) * 30, filteredSongs.length),
            Math.min(pageNum * 30, filteredSongs.length),
        )}
    />
    <PageSelector {pageNum} length={filteredSongs.length} />
{/if}
