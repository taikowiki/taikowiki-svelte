<script lang="ts">
    import { getSongFromContextBySongNo } from "$lib/module/common/song/song.client";
    import { page } from "$app/stores";
    import TitleDisplay from "$lib/components/page/song/[songNo]/TitleDisplay.svelte";
    import MultipleTitleDisplay from "$lib/components/page/song/[songNo]/MultipleTitleDisplay.svelte";
    import SongDataDisplay from "$lib/components/page/song/[songNo]/SongDataDisplay.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import GenreDisplay from "$lib/components/page/song/[songNo]/GenreDisplay.svelte";
    import AlertDisplay from "$lib/components/page/song/[songNo]/AlertDisplay.svelte";
    import CourseContainer from "$lib/components/page/song/[songNo]/CourseContainer.svelte";

    const song = getSongFromContextBySongNo($page.params.songNo);

    const isMobile = getIsMobile();
</script>

{#if song}
    <AlertDisplay isAsiaBanned={song.isAsiaBanned} isKrBanned={song.isKrBanned} isDeleted={song.isDeleted}/>
    <GenreDisplay genres={song.genre}/>
    <TitleDisplay title={song.title} />
    <div class="wrapper" data-isMobile={$isMobile}>
        <MultipleTitleDisplay
            titleKo={song.titleKo}
            titleEn={song.titleEn}
            aliasKo={song.aliasKo}
            aliasEn={song.aliasEn}
        />
        <SongDataDisplay
            bpm={song.bpm}
            bpmShiver={song.bpmShiver}
            version={song.version}
            artists={song.artists}
            addedDate={song.addedDate}
        />
    </div>
    <CourseContainer courses={song.courses}/>
{/if}

<style>
    .wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        column-gap: 10px;
        row-gap: 10px;
    }

    .wrapper[data-isMobile="true"]{
        flex-direction: column;
    }
</style>
