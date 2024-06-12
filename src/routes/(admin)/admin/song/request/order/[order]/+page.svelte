<script lang="ts" context="module">
    import axios from "axios";
    async function approve(request: any & { order: number }) {
        try {
            await axios({
                method: "post",
                data: {
                    order: request.order,
                },
                url: "/admin/api/song/approve",
            });
            alert("저장 성공");
            await goto("/admin/song/request");
        } catch {
            alert("저장 실패");
        }
    }

    async function disapprove(request: any & { order: number }) {
        try {
            await axios({
                method: "post",
                data: {
                    order: request.order,
                },
                url: "/admin/api/song/disapprove",
            });
            alert("거절 성공");
            await goto("/admin/song/request");
        } catch {
            alert("거절 실패");
        }
    }
</script>

<script lang="ts">
    import { goto } from "$app/navigation";
    import AdminRequestEditor from "$lib/components/page/admin/song/request/order/[order]/admin-RequestEditor.svelte";
    import compareSong from "$lib/module/common/song/compare-song";

    export let data;

    const { song, request } = data;

    let compare = null;
    if (song !== null) {
        compare = compareSong(song, request.data);
    }
</script>

<AdminRequestEditor
    bind:songData={request.data}
    type={request.type}
    {compare}
/>

<div class="button-container">
    <button
        on:click={() => {
            approve(request);
        }}
    >
        수락
    </button>
    <button
        on:click={() => {
            disapprove(request);
        }}
    >
        거절
    </button>
</div>

<style>
    .button-container{
        display:flex;
    }
</style>