<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";

    import OtherEditor from "$lib/components/common/song/editor/OtherEditor.svelte";
    import TitleEditor from "$lib/components/common/song/editor/TitleEditor.svelte";
    import CoursesEditor from "$lib/components/common/song/editor/CoursesEditor.svelte";
    import BasicEditor from "./BasicEditor.svelte";

    export let songData: SongData;
    export let type: 'edit'|'new' = 'new';
    export let isAdmin: boolean = false;
</script>

<div class="container">
    <BasicEditor bind:songNo={songData.songNo} {type} {isAdmin}/>
    <TitleEditor
        bind:title={songData.title}
        bind:titleKo={songData.titleKo}
        bind:aliasKo={songData.aliasKo}
        bind:titleEn={songData.titleEn}
        bind:aliasEn={songData.aliasEn}
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
    />
    <CoursesEditor bind:courses={songData.courses} />
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;

        row-gap: 10px;
    }
</style>
