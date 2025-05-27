<script lang="ts">
    import type { DaniType } from "$lib/module/common/dani/types";
    import DaniSong from "./DaniSong.svelte";

    interface Props {
        songs: DaniType.Song[];
        songDatas: DaniType.SongDataForDisplay[];
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
