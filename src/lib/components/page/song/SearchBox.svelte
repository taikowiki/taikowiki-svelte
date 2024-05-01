<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";
    import filter from "$lib/module/page/song/filter";
    import type { SongSearchOption } from "$lib/module/page/song/types";
    import SearchBoxPc from "./SearchBox-Pc.svelte";

    export let songs: SongData[]
    export let filteredSongs: SongData[]|null;

    let option:SongSearchOption = {};
    filteredSongs = filter(songs, option);

    $:{
        filteredSongs = null;
        filteredSongs = filter(songs, option);
    }
</script>

<SearchBoxPc bind:option/>