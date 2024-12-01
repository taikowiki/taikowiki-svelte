<script lang="ts">
    import { page } from "$app/stores";
    import submit from "$lib/module/common/song/submit.client";

    import SongEditor from "$lib/components/common/song/editor/SongEditor.svelte";
    import type { SongData } from "$lib/module/common/song/types";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n.js";
    import PageTitle from "$lib/components/common/PageTitle.svelte";

    export let data;
    let songData = data.song;

    const lang = getLang();
    $: titleI18n = getI18N('other', $lang).title['/song/[songNo]/edit']
</script>

<SongEditor bind:songData type="edit" />

<PageTitle title={`${titleI18n} - ${data.song?.title ?? ''}`}/>

<button
    on:click={() => {
        submit(songData.songNo, songData, `/song/${$page.params.songNo}`);
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
