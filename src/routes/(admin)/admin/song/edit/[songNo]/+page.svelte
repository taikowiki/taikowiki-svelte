<script lang="ts" context="module">
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
    import { goto } from "$app/navigation";

    import SongEditor from "$lib/components/common/song/editor/SongEditor.svelte";
    import type { SongData } from "$lib/module/common/song/types";
    import axios from "axios";
    import { page } from "$app/stores";
    import { songAdminRequestor } from "$lib/module/common/song/song.client.js";

    export let data;
</script>

<SongEditor bind:songData={data.song} type="edit" isAdmin={true}/>
<button
    on:click={() => {
        upload($page.params.songNo, data.song).then(() => {
            goto("/admin/song");
        });
    }}
>
    저장
</button>
