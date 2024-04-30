<script lang="ts">
    import { getSongs } from "../../../../routes/(main)/+layout.svelte";
    import AsideItem from "./AsideItem.svelte";

    let newSongs = getSongs().toSorted((a, b) => b.addedDate - a.addedDate).slice(0, 3);
    console.log(getSongs());
</script>

<AsideItem title="신곡">
    {#each newSongs as song}
        <a href={`/songs/${song.songNo}`}>
            {song.title}
        </a>
    {/each}
</AsideItem>

<style>
    a{
        text-decoration: none;
        color:inherit;
    }
</style>