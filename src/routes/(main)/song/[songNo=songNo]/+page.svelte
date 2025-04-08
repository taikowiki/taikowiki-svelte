<script lang="ts">
    import TitleDisplay from "$lib/components/page/song/[songNo]/TitleDisplay.svelte";
    import MultipleTitleDisplay from "$lib/components/page/song/[songNo]/MultipleTitleDisplay.svelte";
    import SongDataDisplay from "$lib/components/page/song/[songNo]/SongDataDisplay.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import GenreDisplay from "$lib/components/page/song/[songNo]/GenreDisplay.svelte";
    import AlertDisplay from "$lib/components/page/song/[songNo]/AlertDisplay.svelte";
    import CourseContainer from "$lib/components/page/song/[songNo]/CourseContainer.svelte";
    import AddSongButton from "$lib/components/page/song/AddSongButton.svelte";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n.js";
    import type { Difficulty } from "$lib/module/common/song/types.js";
    import { DIFFICULTY } from "$lib/module/common/song/const.js";
    import DocContentView from "$lib/components/page/wikidoc/view/DocContentView.svelte";
    import { page } from "$app/state";
    import DocRedirectFrom from "$lib/components/page/wikidoc/view/DocRedirectFrom.svelte";
    import PageAside from "$lib/components/layout/main/PageAside.svelte";
    import DocSideSearch from "$lib/components/page/wikidoc/view/DocSideSearch.svelte";
    import { writable } from "svelte/store";
    import { setContext } from "svelte";
    import DocIndex from "$lib/components/page/wikidoc/view/DocIndex.svelte";

    let { data } = $props();
    let song = $derived(data.song);
    let docData = $derived(data.docData);

    setContext("docReady", writable(false));

    let diff: Difficulty = $derived.by(() => {
        let diffParam = page.url.searchParams.get("diff") as Difficulty | null;
        if (diffParam && DIFFICULTY.includes(diffParam)) {
            return song?.courses?.[diffParam] ? diffParam : "oni";
        } else {
            return "oni";
        }
    });

    const isMobile = getIsMobile();
    const lang = getLang();
    let i18n = $derived(getI18N("/song/[songNo]", $lang));
    let titleI18n = $derived(getI18N("other", $lang).title["/song/[songNo]"]);
</script>

{#if song}
    <PageTitle title={song.title} />
    <DocRedirectFrom />
    <AlertDisplay
        isAsiaBanned={song.isAsiaBanned}
        isKrBanned={song.isKrBanned}
        isDeleted={song.isDeleted}
    />
    <GenreDisplay genres={song.genre} />
    <TitleDisplay title={song.title} songNo={song.songNo} {docData} />
    <div class="wrapper" data-isMobile={$isMobile}>
        <MultipleTitleDisplay
            titleKo={song.titleKo}
            titleEn={song.titleEn}
            aliasKo={song.aliasKo}
            aliasEn={song.aliasEn}
            romaji={song.romaji}
        />
        <SongDataDisplay
            bpm={song.bpm}
            bpmShiver={song.bpmShiver}
            version={song.version}
            artists={song.artists}
            addedDate={song.addedDate}
        />
    </div>
    <CourseContainer courses={song.courses} selectedDifficulty={diff} />
    {#if data.docData}
        {#if docData.contentTree.subParagraphs.length > 0}
            <PageAside>
                <DocIndex contentTree={docData.contentTree} />
            </PageAside>
            {#if $isMobile}
                <DocIndex contentTree={docData.contentTree} />
            {/if}
        {/if}
        <DocContentView contentTree={docData.contentTree} />
        <PageAside title="문서 검색">
            <DocSideSearch />
        </PageAside>
    {/if}
{:else}
    <PageTitle title={titleI18n} />
    {i18n.noSong}
    <AddSongButton />
{/if}

<style>
    .wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        column-gap: 10px;
        row-gap: 10px;
    }

    .wrapper[data-isMobile="true"] {
        flex-direction: column;
    }
</style>
