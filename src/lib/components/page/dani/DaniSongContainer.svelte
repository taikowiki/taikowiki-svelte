<script lang="ts">
    import type { DaniSong as DaniSongType } from "$lib/module/common/dani/types";
    import type { SongData } from "$lib/module/common/song/types";
    import DaniSong from "./DaniSong.svelte";

    export let songs: DaniSongType[];
    export let songDatas: SongData[];
</script>

<div class="container">
    {#each songs as song}
        <DaniSong {song} {songDatas}/>
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
