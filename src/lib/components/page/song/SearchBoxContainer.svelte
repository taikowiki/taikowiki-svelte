<script lang="ts" module>
    function getOptionFromUrl(url?: URL) {
        let searchParams;
        if (url) {
            searchParams = new URLSearchParams(url.search);
        } else {
            searchParams = new URLSearchParams(location.search);
        }

        const option: Song.SongSearchOption = {};

        const query = searchParams.get("query");
        if (query) {
            option.query = query;
        }
        const genre = searchParams.get("genre");
        if (genre) {
            option.genre = genre as Song.Genre;
        }
        const difficulty = searchParams.get("difficulty");
        const level = Number(searchParams.get("level"));
        if (difficulty && level && !isNaN(level)) {
            option.difficulty = difficulty as Song.Difficulty;
            option.level = level;
        }

        return option;
    }
</script>

<script lang="ts">
    import { Song } from "$lib/module/song";
    import SearchBox from "./SearchBox.svelte";
    import { page } from "$app/stores";

    interface Props {
        songs: Song.SongData[];
        filteredSongs: Song.SongData[] | null;
    }

    let {songs, filteredSongs}: Props = $props();

    let option: Song.SongSearchOption = $state(getOptionFromUrl($page.url));

    $effect.pre(() => {
        filteredSongs = null;
        filteredSongs = Song.filter(songs, option);
    });
</script>

<SearchBox {option} />
