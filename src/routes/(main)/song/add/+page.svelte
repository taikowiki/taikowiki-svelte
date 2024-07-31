<script lang="ts">
    import { page } from "$app/stores";
    import submit from "$lib/module/common/song/submit.client";
    import SongEditor from "$lib/components/common/song/editor/SongEditor.svelte";
    import type { SongData } from "$lib/module/common/song/types";

    let songData: SongData = {
        songNo: $page.url.searchParams.get("song_no") || "",
        title: "",
        titleEn: null,
        titleKo: null,
        aliasEn: null,
        aliasKo: null,
        bpm: {
            min: 0,
            max: 0,
        },
        bpmShiver: 0,
        version: [],
        isAsiaBanned: 0,
        isKrBanned: 0,
        isDeleted: 0,
        genre: [],
        artists: [],
        addedDate: null,
        courses: {
            easy: {
                level: 1,
                isBranched: 0,
                maxCombo: 0,
                playTime: 0,
                balloon: [],
                rollTime: [],
                maxDensity: 0,
                daniUsed: 0,
                dani: [],
                images: [],
            },
            normal: {
                level: 1,
                isBranched: 0,
                maxCombo: 0,
                playTime: 0,
                balloon: [],
                rollTime: [],
                maxDensity: 0,
                daniUsed: 0,
                dani: [],
                images: [],
            },
            hard: {
                level: 1,
                isBranched: 0,
                maxCombo: 0,
                playTime: 0,
                balloon: [],
                rollTime: [],
                maxDensity: 0,
                daniUsed: 0,
                dani: [],
                images: [],
            },
            oni: {
                level: 1,
                isBranched: 0,
                maxCombo: 0,
                playTime: 0,
                balloon: [],
                rollTime: [],
                maxDensity: 0,
                daniUsed: 0,
                dani: [],
                images: [],
            },
            ura: null,
        },
    };
</script>

<SongEditor bind:songData />

<button
    on:click={() => {
        submit(songData.songNo, songData, '/song');
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
