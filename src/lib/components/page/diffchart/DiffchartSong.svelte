<script lang="ts" module>
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

    interface Props {
        song: Song;
        songs: SongDataPickedForDiffchart[];
        theme: string;
        useMobile?: boolean;
        userScore?: SongScoreDetail | null;
    }

    let {
        song,
        songs,
        theme,
        useMobile = true,
        userScore = null,
    }: Props = $props();

    let songData = $derived(songs.find((e) => e.songNo === song.songNo));
    let genre = $derived(songData?.genre || []);
    let krTitle = $derived(
        getKrTitle(songData?.aliasKo, songData?.titleKo, songData?.title),
    );
    let title = $derived(song.title || songData?.title || "");

    const isMobile = getIsMobile();
</script>

{#if useMobile}
    {#if $isMobile}
        <DiffchartSongMobile
            {song}
            {title}
            {genre}
            {krTitle}
            {theme}
            {userScore}
        />
    {:else}
        <DiffchartSongPc {song} {title} {genre} {krTitle} {theme} {userScore} />
    {/if}
{:else}
    <DiffchartSongPc {song} {title} {genre} {krTitle} {theme} {userScore} />
{/if}
