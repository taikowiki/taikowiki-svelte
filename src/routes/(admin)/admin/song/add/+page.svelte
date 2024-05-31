<script lang="ts" context="module">
    import axios from "axios";
    async function upload(songData: SongData) {
        try {
            await axios({
                method: "POST",
                url: "/admin/api/song/upload",
                data: songData,
            });
            alert("저장 성공");
        } catch (err) {
            console.log(err);
            alert("저장 실패");
        }
    }
</script>

<script lang="ts">
    import { page } from "$app/stores";
    import SongEditor from "$lib/components/common/song/editor/SongEditor.svelte";
    import type { SongData } from "$lib/module/common/song/types";
    import { goto } from "$app/navigation";

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

<SongEditor bind:songData type="new"/>

<button
    on:click={() => {
        upload(songData)
        .then(() => {
            goto('/admin/song')
        });
    }}
>
    저장
</button>
