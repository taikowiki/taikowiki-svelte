<script lang="ts">
    import { type SongLang } from "$lib/components/page/song/SongLanguageSelector.svelte";
    import Loading from "$lib/components/common/Loading.svelte";
    import SearchBoxContainer from "$lib/components/page/song/SearchBoxContainer.svelte";
    import SongLanguageSelector from "$lib/components/page/song/SongLanguageSelector.svelte";
    import { loadAllSongs } from "$lib/module/common/song/song.client";
    import type { SongData } from "$lib/module/common/song/types";
    import SongList from "$lib/components/page/song/SongList.svelte";

    let filteredSongs: (SongData & {order:number})[]|null = null;

    let songLang:SongLang;
</script>

{#await loadAllSongs()}
    <Loading />
{:then songs}
    <SearchBoxContainer {songs} bind:filteredSongs />
    <SongLanguageSelector bind:songLang/>
    {#if filteredSongs === null}
        <Loading />
    {:else}
        <SongList {songLang} filteredSongs={filteredSongs.splice(0, 500)}/>
    {/if}
{/await}
