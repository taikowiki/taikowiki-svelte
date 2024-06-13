<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";

    import OtherEditor from "./admin-OtherEditor.svelte";
    import TitleEditor from "./admin-TitleEditor.svelte";
    import CoursesEditor from "./admin-CoursesEditor.svelte";
    import BasicEditor from "./admin-BasicEditor.svelte";
    import { afterUpdate, onMount } from "svelte";

    export let compare: {
        keys: string[];
        courseKeys: string[];
    } | null;

    export let songData: SongData;
    export let type: "edit" | "new" = "new";

    let container: HTMLDivElement;
    afterUpdate(() => {
        container.querySelectorAll("input").forEach((input) => {
            input.readOnly = true;
            input.onclick = () => false;
        });
        container.querySelectorAll("textarea").forEach((textarea) => {
            textarea.readOnly = true;
        });
    });
</script>

<div class="container" bind:this={container}>
    <BasicEditor bind:songNo={songData.songNo} {type} />
    <TitleEditor
        bind:title={songData.title}
        bind:titleKo={songData.titleKo}
        bind:aliasKo={songData.aliasKo}
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
