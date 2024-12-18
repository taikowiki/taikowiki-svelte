<script lang="ts">
    import type { DaniSong as DaniSongType } from "$lib/module/common/dani/types";
    import type { SongDataPickedForDani } from "$lib/module/common/dani/types";
    import DaniSong from "./DaniSong.svelte";

    interface Props {
        songs: DaniSongType[];
        songDatas: SongDataPickedForDani[];
    }
    
    let { songs, songDatas }: Props = $props();
</script>

<div class="container">
    {#each songs as song}
        <DaniSong {song} {songDatas} />
    {/each}
</div>

<style>
    .container {
        width: 100%;

        display: flex;
        flex-direction: column;

        row-gap: 5px;
    }
</style>
