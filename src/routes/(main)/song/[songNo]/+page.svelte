<script lang="ts" context="module">
    async function load(songNo: number) {
        const songdata = await loadSongBySongNo(songNo);
        if (songdata) {
            return songdata;
        } else {
            throw new Error("songdata is null");
        }
    }
</script>

<script lang="ts">
    import { loadSongBySongNo } from "$lib/module/common/song/song.client";
    import { page } from "$app/stores";
    import Loading from "$lib/components/common/Loading.svelte";
    import TitleDisplay from "$lib/components/page/song/[songNo]/TitleDisplay.svelte";
    import MultipleTitleDisplay from "$lib/components/page/song/[songNo]/MultipleTitleDisplay.svelte";
    import GenreDisplay from "$lib/components/page/song/[songNo]/GenreDisplay.svelte";
    import BpmDisplay from "$lib/components/page/song/[songNo]/BpmDisplay.svelte";
    import ArtistsDisplay from "$lib/components/page/song/[songNo]/ArtistsDisplay.svelte";
</script>

{#await load(Number($page.params.songNo))}
    <Loading />
{:then song}
    <TitleDisplay title={song.title} />
    <div class="wrapper">
        <MultipleTitleDisplay
            title={song.title}
            titleKo={song.titleKo}
            aliasKo={song.aliasKo}
            titleEn={song.titleEn}
            aliasEn={song.aliasEn}
        />
        <GenreDisplay genres={song.genre} />
        <BpmDisplay bpm={song.bpm} bpmShiver={song.bpmShiver} />
        <ArtistsDisplay artists={song.artists}/>
    </div>
{/await}

<style>
    .wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    @media only screen and (max-width: 1000px) {
        .wrapper {
            row-gap: 5px;
        }
    }
</style>
