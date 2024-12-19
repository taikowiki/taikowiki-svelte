<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";

    import OtherEditor from "./admin-OtherEditor.svelte";
    import TitleEditor from "./admin-TitleEditor.svelte";
    import CoursesEditor from "./admin-CoursesEditor.svelte";
    import BasicEditor from "./admin-BasicEditor.svelte";

    interface Props {
        compare: any | null;
        songData: SongData;
    }

    let {compare, songData = $bindable()}: Props = $props();
</script>

<div class="container">
    <BasicEditor bind:songNo={songData.songNo} />
    <TitleEditor
        bind:title={songData.title}
        bind:titleKo={songData.titleKo}
        bind:aliasKo={songData.aliasKo}
        bind:titleEn={songData.titleEn}
        bind:aliasEn={songData.aliasEn}
        bind:romaji={songData.romaji}
        {compare}
    />
    <OtherEditor
        bind:bpm={songData.bpm}
        bind:bpmShiver={songData.bpmShiver}
        bind:version={songData.version}
        bind:genre={songData.genre}
        bind:artists={songData.artists}
        bind:isAsiaBanned={songData.isAsiaBanned}
        bind:isDeleted={songData.isDeleted}
        bind:isKrBanned={songData.isKrBanned}
        bind:addedDate={songData.addedDate}
        {compare}
    />
    <CoursesEditor bind:courses={songData.courses} {compare} />
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;

        row-gap: 10px;
    }
</style>
