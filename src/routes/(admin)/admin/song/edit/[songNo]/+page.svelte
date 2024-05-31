<script lang="ts" context="module">
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
            throw err;
        }
    }
</script>

<script lang="ts">
    import { goto } from "$app/navigation";

    import SongEditor from "$lib/components/common/song/editor/SongEditor.svelte";
    import type { SongData } from "$lib/module/common/song/types";
    import axios from "axios";

    export let data;
</script>

<SongEditor bind:songData={data.song} type="edit" />
<button
    on:click={() => {
        upload(data.song)
        .then(() => {
            goto('/admin/song')
        });
    }}
>
    저장
</button>
