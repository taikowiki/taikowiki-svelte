<script lang="ts">
    import { page } from "$app/stores";
    import { Song } from "$lib/module/song/song.client";

    import SongEditor from "$lib/components/common/song/editor/SongEditor.svelte";
    import { getI18N, getLang } from "$lib/module/i18n";
    import PageTitle from "$lib/components/common/PageTitle.svelte";

    let {data} = $props();
    let songData = $state(data.song);

    const lang = getLang();
    let titleI18n = $derived(getI18N('other', $lang).title['/song/[songNo]/edit']);
</script>

<SongEditor bind:songData type="edit" />

<PageTitle title={`${titleI18n} - ${data.song?.title ?? ''}`}/>

<button
    onclick={() => {
        Song.Client.submit(songData.songNo, songData, `/song/${$page.params.songNo}`);
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
