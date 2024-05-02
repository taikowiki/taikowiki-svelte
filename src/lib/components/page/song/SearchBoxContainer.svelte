<script lang="ts" context="module">
    function getOptionFromUrl(url?:URL){
        let searchParams;
        if(url){
            searchParams = new URLSearchParams(url.search);
        }
        else{
            searchParams = new URLSearchParams(location.search)
        }
        
        const option:SongSearchOption = {};

        const query = searchParams.get('query');
        if(query){
            option.query = query;
        }
        const genre = searchParams.get('genre');
        if(genre){
            option.genre = genre as Genre;
        }
        const difficulty = searchParams.get('difficulty');
        const level = Number(searchParams.get('level'));
        if(difficulty && level && !isNaN(level)){
            option.difficulty = difficulty as Difficulty;
            option.level = level;
        }

        return option;
    }
</script>

<script lang="ts">
    import type { Difficulty, Genre, SongData } from "$lib/module/common/song/types";
    import filter from "$lib/module/page/song/filter";
    import type { SongSearchOption } from "$lib/module/page/song/types";
    import SearchBox from "./SearchBox.svelte";
    import { page } from "$app/stores";

    export let songs: SongData[];
    export let filteredSongs: SongData[] | null;

    let option: SongSearchOption = getOptionFromUrl($page.url);

    $: if($page.state){
        option = getOptionFromUrl();
    }    
    $: {
        filteredSongs = null;
        filteredSongs = filter(songs, option);
    }
</script>

<SearchBox {option}/>
