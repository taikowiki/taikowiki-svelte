<script lang="ts">
    import type { Genre } from "$lib/module/common/song/types";
    import type { Song } from "$lib/module/page/diffchart/types";
    import DiffchartSongGenre from "./DiffchartSong-Genre.svelte";
    import color from "$lib/module/common/color";
    import { getLang } from "$lib/module/common/i18n/i18n";
    import { afterUpdate } from "svelte";
    import { browser } from "$app/environment";

    export let song: Song;
    export let genre: Genre[];
    export let krTitle: string;
    export let theme:string;

    const lang = getLang();

    let titleDiv: HTMLDivElement;
    let krTitleDiv: HTMLDivElement;
    afterUpdate(() => {
        if (!browser) {
            return;
        }
        if (titleDiv.clientHeight > 24 && titleDiv.clientHeight < 48) {
            if (krTitleDiv) {
                krTitleDiv.style.fontSize = "10px";
            }
            let fontSize = 16;
            while (titleDiv.clientHeight > 24 && fontSize >= 12) {
                titleDiv.style.fontSize = `${fontSize}px`;
                fontSize--;
            }
        }
        else if(titleDiv.clientHeight > 48){
            if (krTitleDiv) {
                krTitleDiv.style.fontSize = "10px";
            }
            let fontSize = 16;
            while (titleDiv.clientHeight > 30 && fontSize >= 10) {
                titleDiv.style.fontSize = `${fontSize}px`;
                fontSize--;
            }
        }
    });
</script>

<a class="container" href={`/song/${song.songNo}`} data-theme={theme}>
    <DiffchartSongGenre {genre} width="6px" height="36px" />
    <div class="title-container">
        <div
            class="title"
            style={`color:${theme === "light"? color.difficulty[song.difficulty] : color.darkDifficulty[song.difficulty]};`}
            bind:this={titleDiv}
        >
            {song.title}
        </div>
        {#if krTitle && $lang === "ko"}
            <div class="krTitle" bind:this={krTitleDiv}>
                {krTitle}
            </div>
        {/if}
    </div>
</a>

<style>
    .container {
        width: 190px;
        height: 60px;

        display: flex;
        flex-direction: row;
        align-items: center;

        column-gap: 5px;

        background-color: #ededed;

        border-radius: 5px;
        overflow: hidden;

        box-sizing: border-box;
        padding-left: 5px;

        text-decoration: none;
    }

    .container[data-theme="dark"]{
        background-color: #1c1c1c;
    }

    .title-container {
        width: 174px;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .title {
        width: 100%;
        font-weight: 900;

        transform: translateY(-2px);

        box-sizing: border-box;
        padding-right: 5px;
    }

    .krTitle {
        width: 100%;
        font-size: 12px;
        color: #5b5b5b;
        font-weight: bold;

        box-sizing: border-box;
        padding-right: 5px;

        margin-top: -4px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .container[data-theme="dark"] .krTitle{
        color:rgb(193, 193, 193);
    }
</style>
