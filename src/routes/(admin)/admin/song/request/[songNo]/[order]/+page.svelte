<script lang="ts" context="module">
    import axios from "axios";
    import type { SongData } from "$lib/module/common/song/types";
    async function approve(songData: SongData, order: number) {
        try {
            await axios({
                method: "POST",
                url: "/admin/api/song/approve",
                data: {
                    songData,
                    order,
                },
            });
            alert("저장 성공");
        } catch (err) {
            alert("저장 실패");
            throw err;
        }
    }

    async function disapprove(order: number) {
        try {
            await axios({
                method: "POST",
                url: "/admin/api/song/disapprove",
                data: {
                    order,
                },
            });
            alert("삭제 성공");
        } catch (err) {
            alert("삭제 실패");
            throw err;
        }
    }
</script>

<script lang="ts">
    import SongEditor from "$lib/components/common/song/editor/SongEditor.svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    export let data;
</script>

<table>
    <tr>
        <td style="width: 150px;"> 요청자 </td>
        <td>
            {data.requester}
        </td>
    </tr>
    <tr>
        <td style="width: 150px;"> ip </td>
        <td>
            {data.request.ip}
        </td>
    </tr>
</table>

<SongEditor bind:songData={data.request.data} type="edit" />

<button
    on:click={() => {
        approve(data.request.data, data.request.order).then(() => {
            goto(`/admin/song/request/${$page.params.songNo}`);
        });
    }}
>
    저장
</button>

<button
    on:click={() => {
        disapprove(data.request.order).then(() => {
            goto(`/admin/song/request/${$page.params.songNo}`);
        });
    }}
>
    삭제
</button>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
    }
</style>
