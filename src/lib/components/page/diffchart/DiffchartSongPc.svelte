<script lang="ts" context="module">
    function resizeTitle(
        node: HTMLDivElement,
        value: [browser: boolean, theme: string],
    ) {
        function resize(browser: boolean) {
            const titleDiv = node.querySelector<HTMLDivElement>(".title");
            const krTitleDiv = node.querySelector<HTMLDivElement>(".title-kr");
            if (!titleDiv || !browser) return;

            if (titleDiv.clientHeight > 24 && titleDiv.clientHeight < 48) {
                krTitleDiv && (krTitleDiv.style.fontSize = "10px")
                let fontSize = 16;
                while (titleDiv.clientHeight > 24 && fontSize >= 12) {
                    titleDiv.style.fontSize = `${fontSize}px`;
                    fontSize--;
                }
            } else if (titleDiv.clientHeight > 48) {
                krTitleDiv && (krTitleDiv.style.fontSize = "10px");
                let fontSize = 16;
                while (titleDiv.clientHeight > 30 && fontSize >= 10) {
                    titleDiv.style.fontSize = `${fontSize}px`;
                    fontSize--;
                }
            }
        }

        resize(value[0]);

        return {
            update(value: [browser: boolean, theme: string]) {
                resize(value[0]);
            },
        };
    }
</script>

<script lang="ts">
    import type { Genre } from "$lib/module/common/song/types";
    import type {
        Song,
        SongScoreDetail,
    } from "$lib/module/common/diffchart/types";
    import DiffchartSongGenre from "./DiffchartSong-Genre.svelte";
    import color from "$lib/module/common/color";
    import { getLang } from "$lib/module/common/i18n/i18n";
    import { browser } from "$app/environment";

    export let song: Song;
    export let genre: Genre[];
    export let krTitle: string;
    export let theme: string;
    export let userScore: SongScoreDetail | null = null;

    const lang = getLang();

    /*
    afterUpdate(() => {
        if (titleDiv.clientHeight > 24 && titleDiv.clientHeight < 48) {
            if (krTitleDiv) {
                krTitleDiv.style.fontSize = "10px";
            }
            let fontSize = 16;
            while (titleDiv.clientHeight > 24 && fontSize >= 12) {
                titleDiv.style.fontSize = `${fontSize}px`;
                fontSize--;
            }
        } else if (titleDiv.clientHeight > 48) {
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
    */
</script>

<a
    class="container"
    href={`/song/${song.songNo}`}
    data-theme={theme}
    data-crown={userScore?.crown || ""}
>
    <DiffchartSongGenre {genre} width="6px" height="36px" />
    <div class="title-container" use:resizeTitle={[browser, theme]}>
        <div
            class="title"
            style={`color:${theme === "light" ? color.difficulty[song.difficulty] : color.darkDifficulty[song.difficulty]};`}
        >
            {song.title}
        </div>
        {#if krTitle}
            <div class="title-kr" class:hidden={$lang !== "ko"}>
                {krTitle}
            </div>
        {/if}
        {#if userScore?.badge}
            <img
                src={`/assets/img/badge/badge-${userScore.badge}.png`}
                alt=""
                class="badge"
            />
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

    .container[data-theme="dark"] {
        background-color: #1c1c1c;
    }

    .title-container {
        width: 174px;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;

        row-gap: 2px;

        position: relative;
    }

    .title {
        width: 100%;
        font-weight: 900;

        box-sizing: border-box;
        padding-right: 5px;
        line-height: 1.2;

        z-index: 1;
    }

    .title-kr {
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

        z-index: 1;
    }

    .container[data-theme="dark"] .title-kr {
        color: rgb(193, 193, 193);
    }

    .container[data-crown="gold"] {
        background-color: #ffe972;
    }
    .container[data-crown="silver"] {
        background-color: #d4e8ff;
    }
    .container[data-crown="donderfull"] {
        background: linear-gradient(
            45deg,
            #ffb3ba,
            /* pink */ #ffdfba,
            /* peach */ #ffffba,
            /* yellow */ #baffc9,
            /* mint */ #bae1ff /* light blue */
        );
    }
    .container[data-crown="silver"] .title-kr,
    .container[data-crown="gold"] .title-kr,
    .container[data-crown="donderfull"] .title-kr {
        color: #5b5b5b;
    }

    .badge {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 22px;
        height: 22px;

        z-index: 0;
    }

    .hidden{
        display:none;
    }
</style>
