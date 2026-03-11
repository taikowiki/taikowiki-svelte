<script lang="ts">
    import { Song } from "$lib/module/song";

    import OtherEditor from "$lib/components/common/song/editor/OtherEditor.svelte";
    import TitleEditor from "$lib/components/common/song/editor/TitleEditor.svelte";
    import CoursesEditor from "$lib/components/common/song/editor/CoursesEditor.svelte";
    import BasicEditor from "./BasicEditor.svelte";

    interface Props {
        songData: Song.SongData;
        type?: "edit" | "new";
        isAdmin?: boolean;
        compare?: any;
    }

    let {
        songData = $bindable(),
        type = "new",
        isAdmin = false,
        compare
    }: Props = $props();

    let titleRecord = $state({
        title: songData.title,
        titleKo: songData.titleKo,
        titleEn: songData.titleEn,
        titleZhCN: songData.titleZhCN,
        aliasKo: songData.aliasKo,
        aliasEn: songData.aliasEn,
        romaji: songData.romaji,
    });
    $effect(() => {
        for (const k in titleRecord) {
            const key = k as keyof typeof titleRecord;
            if (key === "title") {
                songData[key] = titleRecord[key];
            } else {
                songData[key] = titleRecord[key];
            }
        }
    });
</script>

<div class="container">
    <BasicEditor bind:songNo={songData.songNo} {type} {isAdmin} />
    <TitleEditor bind:titleRecord {compare}/>
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
    <CoursesEditor bind:courses={songData.courses} {compare}/>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;

        row-gap: 10px;
    }
</style>
