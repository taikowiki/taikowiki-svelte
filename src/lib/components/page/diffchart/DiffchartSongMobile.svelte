<script lang="ts">
    import type { Genre } from "$lib/module/common/song/types";
    import type {
        Song,
        SongScoreDetail,
    } from "$lib/module/common/diffchart/types";
    import DiffchartSongGenre from "./DiffchartSong-Genre.svelte";
    import color from "$lib/module/common/color";
    import { getLang } from "$lib/module/common/i18n/i18n";

    interface Props {
        song: Song;
        title: string;
        genre: Genre[];
        krTitle: string;
        theme: string;
        userScore?: SongScoreDetail | null;
    }

    let {
        song,
        title,
        genre,
        krTitle,
        theme,
        userScore = null,
    }: Props = $props();

    const lang = getLang();
</script>

<a
    class="container"
    href={`/song/${song.songNo}?diff=${song.difficulty}`}
    data-theme={theme}
    data-crown={userScore?.crown || ""}
>
    <DiffchartSongGenre {genre} width="6px" height="26px" />
    <div class="title-container">
        <div
            class="title"
            style={`color:${theme === "light" ? color.difficulty[song.difficulty] : color.darkDifficulty[song.difficulty]};`}
        >
            {title}
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
        width: calc(100% - 10px);
        height: 40px;

        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 5px;

        background-color: #ededed;

        border-radius: 5px;

        box-sizing: border-box;
        padding-inline: 5px;

        text-decoration: none;
    }

    .title-container {
        width: calc(100% - 21px);
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;

        transform: translateY(-1px);
    }

    .title-container * {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .title {
        font-size: 13px;

        font-weight: 900;

        z-index: 1;
    }
    .title-kr {
        font-size: 10px;
        color: #5b5b5b;

        font-weight: bold;
        z-index: 1;
    }

    .container[data-theme="dark"] {
        background-color: #1c1c1c;
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
    .hidden {
        display: none;
    }
</style>
