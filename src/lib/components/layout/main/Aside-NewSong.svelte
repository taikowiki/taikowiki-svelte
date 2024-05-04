<script lang="ts">
    import AsideItem from "./AsideItem.svelte";
    import { useLang } from "$lib/module/common/i18n/i18n";
    import i18n from "$lib/module/common/i18n/i18n";

    export let newSongs;

    const lang = useLang();
    $: i18nLayout = i18n[$lang].layout.main
</script>

<AsideItem title={i18nLayout.newSong}>
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