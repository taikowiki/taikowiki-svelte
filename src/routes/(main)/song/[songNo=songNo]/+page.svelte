<script lang="ts">
    import { page } from "$app/stores";
    import TitleDisplay from "$lib/components/page/song/[songNo]/TitleDisplay.svelte";
    import SongDataDisplay from "$lib/components/page/song/[songNo]/SongDataDisplay.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import GenreDisplay from "$lib/components/page/song/[songNo]/GenreDisplay.svelte";
    import AlertDisplay from "$lib/components/page/song/[songNo]/AlertDisplay.svelte";
    import CourseContainer from "$lib/components/page/song/[songNo]/CourseContainer.svelte";
    import AddSongButton from '$lib/components/page/song/AddSongButton.svelte';
    import SongLanguageSelector from '$lib/components/page/song/SongLanguageSelector.svelte';
    import type { SongData, SongLang } from "$lib/module/common/song/types.js";
    export let data;
    const song = data.songs.find((song: SongData) => song.songNo === $page.params.songNo) ?? null;

    let songLang: SongLang;

    const isMobile = getIsMobile();
    
    const getSongTitle = (lang: SongLang): string => {
        if(!song) return "";
        switch(lang){
            case "jp":
                return song.title;
            case "ko":
                return song.titleKo || song.title;
            case "ako":
                return song.aliasKo || song.titleKo || song.title;
            default:
                return song.title;
        }
    }
</script>

{#if song}
    <AlertDisplay isAsiaBanned={song.isAsiaBanned} isKrBanned={song.isKrBanned} isDeleted={song.isDeleted}/>
    <GenreDisplay genres={song.genre}/>
    <TitleDisplay title={(getSongTitle(songLang))} songNo={song.songNo}/>
    <div class="wrapper" data-isMobile={$isMobile}>
        <SongLanguageSelector bind:songLang/>
        <SongDataDisplay
            bpm={song.bpm}
            bpmShiver={song.bpmShiver}
            version={song.version}
            artists={song.artists}
            addedDate={song.addedDate}
        />
    </div>
    <CourseContainer courses={song.courses}/>
{:else}
    해당 곡이 존재하지 않습니다.
    <AddSongButton/>
{/if}

<style>
    .wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        column-gap: 10px;
        row-gap: 10px;
    }
</style>
