<script lang="ts">
    import AsideItem from "./AsideItem.svelte";

    export let newSongs;
</script>

<AsideItem title="신곡">
    {#each newSongs as song}
        <a href={`/song/${song.songNo}`}>
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