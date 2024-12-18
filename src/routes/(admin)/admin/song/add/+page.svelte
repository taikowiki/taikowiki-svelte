<script lang="ts" module>
    async function upload(songNo: string, songData: Partial<SongData>) {
        if (!songData.title || !songData.songNo) {
            alert("곡 번호와 제목을 입력해주세요.");
            return;
        }
        const response = await songAdminRequestor.uploadSong({
            songNo,
            songData,
        });
        if (response.status === "success") {
            alert("저장 성공");
        } else {
            alert("저장 실패");
        }
    }
</script>

<script lang="ts">
    import { page } from "$app/stores";
    import SongEditor from "$lib/components/common/song/editor/SongEditor.svelte";
    import type { SongData } from "$lib/module/common/song/types";
    import { goto } from "$app/navigation";
    import { songAdminRequestor } from "$lib/module/common/song/song.client";

    let songData: SongData = $state({
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
    });
</script>

<SongEditor bind:songData type="new" />

<button
    onclick={() => {
        upload(songData.songNo, songData).then(() => {
            goto("/admin/song");
        });
    }}
>
    저장
</button>
