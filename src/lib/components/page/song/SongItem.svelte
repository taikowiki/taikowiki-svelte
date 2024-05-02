<script lang="ts">
    import color from "$lib/module/common/color";
    import type { Difficulty, SongData } from "$lib/module/common/song/types";
    import { onDestroy, onMount } from "svelte";
    import type { SongLang } from "./SongLanguageSelector.svelte";
    import { getTheme } from "$lib/module/layout/theme";

    export let song: SongData;
    export let songLang: SongLang;

    const diffs: Difficulty[] = ["easy", "normal", "hard", "oni", "ura"];

    //let titleContainer: HTMLElement;
    //onMount(resizeHandle);
    onMount(() => {
        //resizeObserver.observe(titleContainer);
    });

    onDestroy(() => {
        //resizeObserver.unobserve(titleContainer);
    });

    const [theme] = getTheme();

    /*
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
    */
</script>

<a class="container" href={`/song/${song.songNo}`} data-theme={$theme}>
    <div class="genre-container">
        {#each song.genre as genre}
            <div
                class="genre-item"
                style={`background-color:${color.genre[genre]};`}
                data-theme={$theme}
            >
                <!--<span>{genre}</span>-->
            </div>
        {/each}
    </div>
    <div class="title-container">
        {#if songLang === "jp"}
            {song.title}
        {:else if songLang === "ko"}
            {song.titleKo || song.title}
        {:else if songLang === "ako"}
            {song.aliasKo || song.titleKo || song.title}
        {/if}
    </div>
    <div class="third-container">
        <div class="artists-container" data-theme={$theme}>
            {song.artists.join(",")}
        </div>
        <div class="level-container">
            {#each diffs as diff}
                {#if song.courses[diff]}
                    <div class="level-item" data-theme={$theme}>
                        {song.courses[diff]?.level}
                        <div
                            class="level-color"
                            style={`background-color:${color.difficulty[diff]};`}
                            data-theme={$theme}
                        />
                    </div>
                {:else}
                    <div class="level-item" />
                {/if}
            {/each}
        </div>
    </div>
</a>

<style>
    .container {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: flex-start;

        /*box-shadow: 0px 2px 2px #cf4844;*/
        box-shadow: 0px 2px 2px #d1d1d1;

        padding: 15px;
        box-sizing: border-box;

        border-radius: 5px;

        color: inherit;
        text-decoration: none;
    }

    .container[data-theme="dark"] {
        box-shadow: none;

        background-color: black;
    }

    .genre-container {
        width: 100%;

        display: flex;
        flex-direction: row;
        column-gap: 5px;
    }
    .genre-item {
        width: 30px;
        height: 7px;

        border-radius: 5px;

        padding-inline: 3px;

        font-size: 13px;

        display: flex;
        justify-content: center;
        align-items: center;

        color: white;
    }
    .genre-item[data-theme="dark"]{
        filter: brightness(85%);
    }
    /*
    .genre-item > span{
        transform: translateY(-1px);
    }
    */

    .title-container {
        width: 100%;
        font-weight: bold;

        transform: translateY(4px);
    }
    .artists-container {
        width: calc(100% - 170px);
        height: 100%;
        font-size: 12px;
        color: #919191;

        transform: translateY(1px);
    }
    .artists-container[data-theme="dark"]{
        color: #c9c9c9;
    }
    .title-container,
    .artists-container {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .third-container{
        width: 100%;
        display:flex;
        flex-direction: row;
        align-items: flex-end;
    }

    .level-container {
        width: 170px;

        display: flex;
        flex-direction: row;

        column-gap: 5px;
        font-size: 13px;
    }
    .level-item {
        width: 30px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        font-weight: bold;
    }
    .level-color {
        width: 100%;
        height: 5px;

        border-radius: 50vh;
    }
    .level-color[data-theme="dark"]{
        filter: brightness(85%);
    }
    @media only screen and (max-width: 1000px){
        .artists-container{
            width: calc( 100% - 145px );
            font-size: 11px;
            transform: translateY(2px);
        }

        .third-container{
            align-items: center;
        }

        .level-container{
            width: 145px;
        }
        .level-item{
            width: 25px;
        }
    }
</style>
