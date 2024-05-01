<script lang="ts">
    import Loading from "$lib/components/common/Loading.svelte";
    import SearchBoxContainer from "$lib/components/page/song/SearchBoxContainer.svelte";
    import { loadAllSongs } from "$lib/module/common/song/song.client";
    import type { SongData } from "$lib/module/common/song/types";

    let filteredSongs: SongData[]|null = null;
</script>

{#await loadAllSongs()}
    <Loading />
{:then songs}
    <SearchBoxContainer {songs} bind:filteredSongs />
    {#if filteredSongs === null}
        <Loading />
    {:else}
        {#each filteredSongs as song}
            {song.title}<br />
        {/each}
    {/if}
{/await}
