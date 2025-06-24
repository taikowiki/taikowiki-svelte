<script lang="ts">
    import { Util } from "$lib/module/util";
    import { onDestroy, onMount } from "svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import { Song } from "$lib/module/song";

    interface Props {
        song: Song.SongDataPickedForSearch;
        songLang: Song.SongLang;
    }

    let { song, songLang }: Props = $props();

    const diffs: Song.Difficulty[] = ["easy", "normal", "hard", "oni", "ura"];

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

{#snippet genre()}
    <div class="genre-container">
        {#each song.genre as genre}
            <div
                class="genre-item"
                style={`background-color:${Util.Color.genre[genre]};`}
                data-theme={$theme}
            >
                <!--<span>{genre}</span>-->
            </div>
        {/each}
    </div>
{/snippet}
{#snippet title()}
    <div class="title-container">
        {#if songLang === "ja"}
            {song.title}
        {:else if songLang === "ko"}
            {song.titleKo || song.title}
        {:else if songLang === "ako"}
            {song.aliasKo || song.titleKo || song.title}
        {:else if songLang === "en"}
            {song.titleEn || song.title}
        {:else if songLang === "aen"}
            {song.aliasEn || song.titleEn || song.title}
        {:else if songLang === "rom"}
            {song.romaji || song.title}
        {/if}
    </div>
{/snippet}
{#snippet artists()}
    <div class="artists-container" data-theme={$theme}>
        {song.artists.join(", ")}
    </div>
{/snippet}
{#snippet levels()}
    <div class="level-container">
        {#each diffs as diff}
            {#if song.courses[diff]}
                <div class="level-item" data-theme={$theme}>
                    {song.courses[diff]?.level}
                    <div
                        class="level-color"
                        style={`background-color:${Util.Color.difficulty[diff]};`}
                        data-theme={$theme}
                    ></div>
                </div>
                <!--
            {:else}
            <div class="level-item" />
        -->
            {/if}
        {/each}
    </div>
{/snippet}

<a class="container" href={`/song/${song.songNo}`} data-theme={$theme}>
    {@render genre()}
    {@render title()}
    <div class="third-container">
        {@render artists()}
        {@render levels()}
    </div>
</a>

<style>
    .container {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: flex-start;

        /*box-shadow: 0px 2px 2px #d2b3b2;*/
        box-shadow: 0px 0px 3px #d4d4d4;

        padding: 15px;
        box-sizing: border-box;

        border-radius: 5px;

        color: inherit;
        text-decoration: none;
    }

    .container[data-theme="dark"] {
        box-shadow: none;

        background-color: #1c1c1c;
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
    .genre-item[data-theme="dark"] {
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
        font-size: 15px;

        transform: translateY(6px);

        margin-top: 4px;
    }
    .artists-container {
        width: calc(100% - 170px);
        font-size: 12px;
        color: #919191;

        transform: translateY(3px);
    }
    .artists-container[data-theme="dark"] {
        color: #c9c9c9;
    }
    .title-container,
    .artists-container {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .third-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-end;

        margin-top: 4px;
    }

    .level-container {
        width: 170px;

        display: flex;
        flex-direction: row;
        justify-content: flex-end;

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
    .level-color[data-theme="dark"] {
        filter: brightness(85%);
    }
    @media only screen and (max-width: 1000px) {
        .artists-container {
            width: calc(100% - 145px);
            font-size: 11px;
            transform: translateY(1px);
        }

        .level-container {
            width: 145px;
        }
        .level-item {
            width: 25px;
        }
    }
</style>
