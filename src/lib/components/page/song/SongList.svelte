<script lang="ts">
    import SongItem from "./SongItem.svelte";
    import { Song } from "$lib/module/song";

    interface Props {
        songLang: Song.SongLang;
        songs: Song.SongDataPickedForSearch[];
    }

    let { songLang, songs }: Props = $props();
</script>

<div class="container">
    {#each songs as song (song.order)}
        <SongItem {song} {songLang} />
    {/each}
</div>

<style>
    .container {
        display: grid;
        margin-top: 10px;

        grid-template-columns: repeat(2, calc((100% - 10px) / 2));
        column-gap: 10px;
        row-gap: 10px;
    }

    @media only screen and (max-width: 1000px) {
        .container {
            display: flex;
            flex-direction: column;
            row-gap: 5px;
        }
    }
</style>
