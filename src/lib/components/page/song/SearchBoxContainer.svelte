<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";
    import filter from "$lib/module/page/song/filter";
    import type { SongSearchOption } from "$lib/module/page/song/types";
    import SearchBox from "./SearchBox.svelte";

    export let songs: SongData[]
    export let filteredSongs: SongData[]|null;

    let option:SongSearchOption = {};
    filteredSongs = filter(songs, option);

    $:{
        filteredSongs = null;
        filteredSongs = filter(songs, option);
    }
</script>

<SearchBox bind:option/>