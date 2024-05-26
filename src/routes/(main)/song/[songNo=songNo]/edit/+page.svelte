<script lang="ts" context="module">
    function submit(songData: SongData, form: HTMLFormElement) {
        if (!songData.songNo || !songData.title) {
            alert("곡 제목과 곡 번호를 확인해주세요.");
            return;
        }
        form.submit();
    }
</script>

<script lang="ts">
    import { page } from "$app/stores";

    import SongEditor from "$lib/components/page/song/add/SongEditor.svelte";
    import { getSongFromContextBySongNo } from "$lib/module/common/song/song.client";
    import type { SongData } from "$lib/module/common/song/types";

    let maybeSongData: SongData|null = getSongFromContextBySongNo($page.params.songNo);
    
    let songData = maybeSongData as SongData;

    let form: HTMLFormElement;
    $: value = JSON.stringify(songData);
    $: songNo = songData.songNo;
</script>

<div class="form-container">
    <form method="post" action="/api/song/submit" bind:this={form}>
        <input type="text" name="data" bind:value />
        <input type="text" name="song_no" bind:value={songNo} />
    </form>
</div>
<SongEditor bind:songData type="edit" />

<button
    on:click={() => {
        submit(songData, form);
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

    .form-container {
        display: none;
    }
</style>
