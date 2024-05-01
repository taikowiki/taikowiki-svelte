<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";
    import SongItem from "./SongItem.svelte";
    import type { SongLang } from "./SongLanguageSelector.svelte";

    export let songLang: SongLang;
    export let filteredSongs: (SongData & {order:number})[];
</script>

<div class="container">
    {#each filteredSongs as song (song.order)}
        <SongItem {song} {songLang} />
    {/each}
</div>

<style>
    .container {
        display: grid;
        margin-top: 5px;

        grid-template-columns: repeat(2, calc((100% - 10px) / 2));
        column-gap: 10px;
        row-gap: 10px;
    }

    @media only screen and (max-width:1000px){
        .container{
            display:flex;
            flex-direction: column;
            row-gap:5px;
        }
    }
</style>
