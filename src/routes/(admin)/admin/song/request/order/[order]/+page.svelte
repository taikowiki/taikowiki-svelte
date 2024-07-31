<script lang="ts" context="module">
    async function approve(
        request: any & { order: number },
        songData: SongData,
    ) {
        const response = await songAdminRequestor.approve({
            order: request.order,
            songData,
        });
        if (response.status === "success") {
            alert("저장 성공");
            await goto("/admin/song/request");
        } else {
            alert("저장 실패");
        }
    }

    async function disapprove(request: any & { order: number }) {
        const response = await songAdminRequestor.disapproveRequest({
            order: [request.order]
        })
        if(response.status === 'success'){
            alert("거부 성공");
            await goto("/admin/song/request");
        }
        else{
            alert("거부 실패");
        }
    }
</script>

<script lang="ts">
    import { goto } from "$app/navigation";
    import AdminRequestEditor from "$lib/components/page/admin/song/request/order/[order]/admin-RequestEditor.svelte";
    import compareSong from "$lib/module/common/song/compare-song";
    import type { SongData } from "$lib/module/common/song/types.js";
    import { songAdminRequestor } from "$lib/module/common/song/song.client.js";

    export let data;

    const { song, request } = data;

    let compare = null;
    if (song !== null) {
        compare = compareSong(song, request.data);
    }
</script>

<table>
    <tr>
        <td style="width: 150px;"> 요청자 </td>
        <td>
            {data.requestor}
        </td>
    </tr>
    <tr>
        <td style="width: 150px;"> ip </td>
        <td>
            {data.request.ip}
        </td>
    </tr>
    <tr>
        <td> 타입 </td>
        <td>
            {data.request.type}
        </td>
    </tr>
</table>

<AdminRequestEditor bind:songData={request.data} {compare} />

<div class="button-container">
    <button
        on:click={() => {
            approve(request, request.data);
        }}
    >
        수락
    </button>
    <button
        on:click={() => {
            disapprove(request);
        }}
    >
        거부
    </button>
</div>

<style>
    .button-container {
        display: flex;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
    }
</style>
