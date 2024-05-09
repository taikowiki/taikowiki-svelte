<script lang="ts">
    import type { Genre } from "$lib/module/common/song/types";
    import type { Song } from "$lib/module/page/diffchart/types";
    import DiffchartSongGenre from "./DiffchartSong-Genre.svelte";

    export let song:Song
    export let genre:Genre[]
</script>

<div class="container">
    <DiffchartSongGenre {genre}/>
    <div class="title">
        {song.title}
    </div>
</div>