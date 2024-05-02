<script lang="ts">
    import { page } from "$app/stores";
    import type { Difficulty, Genre, SongData } from "$lib/module/common/song/types";
    import filter from "$lib/module/page/song/filter";
    import type { SongSearchOption } from "$lib/module/page/song/types";
    import SearchBox from "./SearchBox.svelte";

    export let songs: SongData[];
    export let filteredSongs: SongData[] | null;
    export let pageNum:number;

    let option: SongSearchOption = {};
    let paramKeys = [...$page.url.searchParams.keys()];
    if(paramKeys.includes('genre')){
        option.genre = $page.url.searchParams.get('genre') as Genre
    }
    if(paramKeys.includes('difficulty') && paramKeys.includes('level')){
        option.difficulty = $page.url.searchParams.get('difficulty') as Difficulty;
        option.level = Number($page.url.searchParams.get('level'));
    }

    $: {
        filteredSongs = null;
        filteredSongs = filter(songs, option);
    }
</script>

<SearchBox bind:pageNum bind:option />
