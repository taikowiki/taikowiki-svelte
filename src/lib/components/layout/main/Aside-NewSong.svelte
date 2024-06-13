<script lang="ts">
    import AsideItem from "./AsideItem.svelte";
    import { getI18N, getLang, useLang } from "$lib/module/common/i18n/i18n";

    export let newSongs;

    const lang = getLang();
    $: i18nLayout = getI18N("layout", $lang).main;
</script>

<AsideItem title={i18nLayout.newSong}>
    {#each newSongs as song}
        <a href={`/song/${song.songNo}`}>
            {song.title}
        </a>
    {/each}
</AsideItem>

<style>
    a {
        text-decoration: none;
        color: inherit;
    }
</style>
