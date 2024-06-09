<script lang="ts">
    import { page } from "$app/stores";
    import submit from "$lib/module/page/song/submit.client";

    import SongEditor from "$lib/components/common/song/editor/SongEditor.svelte";
    import type { SongData } from "$lib/module/common/song/types";

    export let data;
    let maybeSongData: SongData|null = data.song;
    let songData = maybeSongData as SongData;
</script>

<SongEditor bind:songData type="edit" />

<button
    on:click={() => {
        submit(songData.songNo, songData, `/song/${$page.params.songNo}`);
    }}
>
    <img src="/assets/icon/plus.svg" alt="" />
    제출
</button>

<style>
    button {
        width: 90px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 5px;

        color: white;

        text-decoration: none;

        background-color: #cf4844;

        border-radius: 5px;

        border: none;

        cursor: pointer;

        margin-top: 15px;
    }

    img {
        width: 20px;

        filter: invert(100%);
    }
</style>
