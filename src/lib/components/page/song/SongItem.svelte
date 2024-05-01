<script lang="ts">
    import color from "$lib/module/common/color";
    import type { Difficulty, SongData } from "$lib/module/common/song/types";
    import { onDestroy, onMount } from "svelte";
    import type { SongLang } from "./SongLanguageSelector.svelte";
    import { getTheme } from "$lib/module/layout/theme";

    export let song: SongData;
    export let songLang: SongLang;
    export let resizeObserver: ResizeObserver;

    const diffs: Difficulty[] = ["easy", "normal", "hard", "oni", "ura"];

    let titleContainer: HTMLElement;
    onMount(resizeHandle);
    onMount(() => {
        resizeObserver.observe(titleContainer);
    })

    onDestroy(() => {
        resizeObserver.unobserve(titleContainer);
    })

    const [theme] = getTheme();

    function resizeHandle() {
        let width =
            // @ts-expect-error
            titleContainer.children[0].offsetWidth +
            // @ts-expect-error
            titleContainer.children[1].offsetWidth +
            5;

        if (width > titleContainer.offsetWidth) {
            // @ts-expect-error
            titleContainer.children[1].display = "none";
        } else {
            // @ts-expect-error
            titleContainer.children[1].display = "flex";
        }
    }
</script>

<a class="container" href={`/song/${song.songNo}`} data-theme={$theme}>
    <div class="genre-container">
        {#each song.genre as genre}
            <div
                class="genre-item"
                style={`background-color:${color.genre[genre]};`}
            >
                <span>
                    {genre}
                </span>
            </div>
        {/each}
    </div>
    <div class="title-container" bind:this={titleContainer}>
        <div class="title">
            {#if songLang === "jp"}
                {song.title}
            {:else if songLang === "ko"}
                {song.titleKo || song.title}
            {:else if songLang === "ako"}
                {song.aliasKo || song.titleKo || song.title}
            {/if}
        </div>
        <div class="artists">
            <span>{song.artists.join(", ")}</span>
        </div>
    </div>
    <div class="level-container">
        {#each diffs as diff}
            {#if song.courses[diff]}
                <div
                    class="level-item"
                    style={`background-color:${color.difficulty[diff]};`}
                >
                    <span>{song.courses[diff]?.level}</span>
                </div>
            {:else}
                <div class="level-item" />
            {/if}
        {/each}
    </div>
</a>

<style>
    .container {
        width: 100%;
        height: 90px;

        box-sizing: border-box;
        padding: 5px;

        border-radius: 5px;
        border: 2px solid #cf4844;

        color: inherit;
        text-decoration: none;

        /*background-color: #F8F0DF;*/

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .container[data-theme="dark"] {
        border-color: black;
    }
    /*
    .container:nth-child(4n-1), .container:nth-child(4n-2){
        background-color: rgb(225, 225, 225);
    }
    .container:nth-child(4n), .container:nth-child(4n-3){
        background-color: rgb(203, 203, 203);
    }
    */

    .genre-container {
        width: 100%;

        display: flex;
        justify-content: flex-start;
        align-items: center;

        column-gap: 5px;
    }
    .genre-item {
        color: white;
        font-weight: bold;

        box-sizing: border-box;

        padding-inline: 5px;

        border-radius: 3px;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .genre-item > span {
        transform: translateY(-1px);
    }

    .title-container {
        width: 100%;

        display: flex;
        flex-direction: row;
        align-items: flex-end;
        column-gap: 5px;
    }
    .title {
        font-weight: bold;
        font-size: 20px;
        white-space: nowrap;
    }
    .artists {
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        transform: translateY(-2px);
    }

    .level-container {
        width: 100%;

        display: flex;
        flex-direction: row;

        column-gap: 3px;
    }
    .level-item {
        width: 33px;
        height: 20px;

        border-radius: 5px;

        display: flex;
        justify-content: center;
        align-items: center;

        color: white;
        font-size: 14px;
        font-weight: bold;
    }
    .level-item > span {
        transform: translateY(-1px);
    }
</style>
