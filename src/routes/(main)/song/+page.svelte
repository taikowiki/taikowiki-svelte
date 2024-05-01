<script lang="ts">
    import Loading from "$lib/components/common/Loading.svelte";
    import SearchBox from "$lib/components/page/song/SearchBox.svelte";
    import { loadAllSongs } from "$lib/module/common/song/song.client";
    import type { SongData } from "$lib/module/common/song/types";

    let filteredSongs: SongData[]|null = null;
</script>

{#await loadAllSongs()}
    <Loading />
{:then songs}
    <SearchBox {songs} bind:filteredSongs />
    {#if filteredSongs === null}
        <Loading />
    {:else}
        {#each filteredSongs as song}
            {song.title}<br />
        {/each}
    {/if}
{/await}
