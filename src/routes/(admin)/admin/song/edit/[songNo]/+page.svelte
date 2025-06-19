<script lang="ts" module>
    async function upload(songNo: string, songData: Partial<Song.SongData>) {
        if (!songData.title || !songData.songNo) {
            alert("곡 번호와 제목을 입력해주세요.");
            return;
        }
        const response = await Song.Client.adminRequest.uploadSong({
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
    import { Song } from "$lib/module/song/song.client";
    import { page } from "$app/stores";

    let {data} = $props();
    let songData = $state(data.song);
</script>

<SongEditor bind:songData type="edit" isAdmin={true}/>
<button
    onclick={() => {
        upload($page.params.songNo, songData).then(() => {
            goto("/admin/song");
        });
    }}
>
    저장
</button>
