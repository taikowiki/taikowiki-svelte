<script lang="ts" context="module">
    function getKrTitle(
        aliasKo: string | null | undefined,
        titleKo: string | null | undefined,
        title: string | null | undefined,
    ) {
        return ((aliasKo || titleKo) === title ? "" : aliasKo || titleKo) || "";
    }
</script>

<script lang="ts">
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import type {
        Song,
        SongScoreDetail,
    } from "$lib/module/common/diffchart/types";
    import DiffchartSongMobile from "./DiffchartSongMobile.svelte";
    import DiffchartSongPc from "./DiffchartSongPc.svelte";
    import type { SongDataPickedForDiffchart } from "$lib/module/common/diffchart/types";

    export let song: Song;
    export let songs: SongDataPickedForDiffchart[];
    export let theme: string;
    export let useMobile: boolean = true;
    export let userScore: SongScoreDetail | null = null;

    $: songData = songs.find((e) => e.songNo === song.songNo);
    $: genre = songData?.genre || [];
    $: krTitle = getKrTitle(
        songData?.aliasKo,
        songData?.titleKo,
        songData?.title,
    );
    $: title = song.title || songData?.title || "";

    const isMobile = getIsMobile();
</script>

{#if useMobile}
    {#if $isMobile}
        <DiffchartSongMobile {song} {title} {genre} {krTitle} {theme} {userScore} />
    {:else}
        <DiffchartSongPc {song} {title} {genre} {krTitle} {theme} {userScore} />
    {/if}
{:else}
    <DiffchartSongPc {song} {title} {genre} {krTitle} {theme} {userScore} />
{/if}
