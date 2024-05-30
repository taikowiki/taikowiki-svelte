<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";

    import OtherEditor from "$lib/components/page/song/add/OtherEditor.svelte";
    import TitleEditor from "$lib/components/page/song/add/TitleEditor.svelte";
    import CoursesEditor from "$lib/components/page/song/add/CoursesEditor.svelte";
    import BasicEditor from "./BasicEditor.svelte";

    export let songData: SongData;
    export let type: 'edit'|'new' = 'new';
</script>

<div class="container">
    <BasicEditor bind:songNo={songData.songNo} {type}/>
    <TitleEditor
        bind:title={songData.title}
        bind:titleKo={songData.titleKo}
        bind:aliasKo={songData.aliasKo}
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
