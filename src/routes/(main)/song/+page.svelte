<script lang="ts">
    import { type SongLang } from "$lib/module/common/song/types";
    import SongLanguageSelector from "$lib/components/page/song/SongLanguageSelector.svelte";
    import SongList from "$lib/components/page/song/SongList.svelte";
    import PageSelector from "$lib/components/page/song/PageSelector.svelte";
    import AddSongButton from "$lib/components/page/song/AddSongButton.svelte";
    import SearchBox from "$lib/components/page/song/SearchBox.svelte";
    import { navigating } from "$app/stores";
    import Loading from "$lib/components/common/Loading.svelte";

    export let data;

    let songLang: SongLang;

    $: pageNum = data.pageNum;
    $: option = data.option;
    $: songs = data.songs;
    $: length = data.count;
</script>

<SearchBox {option} />
{#if $navigating}
    <Loading />
{:else}
    {#if length !== 0}
        <SongLanguageSelector bind:songLang />
    {/if}
    <SongList {songLang} {songs} />
    <PageSelector {pageNum} {length} />
    <AddSongButton />
{/if}
