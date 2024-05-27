<script lang="ts">
    import type { Genre } from "$lib/module/common/song/types";
    import type {
        Song,
        SongScore,
        SongScoreDetail,
    } from "$lib/module/page/diffchart/types";
    import DiffchartSongGenre from "./DiffchartSong-Genre.svelte";
    import color from "$lib/module/common/color";

    export let song: Song;
    export let genre: Genre[];
    export let krTitle: string;
    export let theme: string;
    export let userScore: SongScoreDetail | null = null;
</script>

<a class="container" href={`/song/${song.songNo}`} data-theme={theme}>
    <DiffchartSongGenre {genre} width="6px" height="26px" />
    <div class="title-container" data-crown={userScore?.crown || ""}>
        <div
            class="title"
            style={`color:${theme === "light" ? color.difficulty[song.difficulty] : color.darkDifficulty[song.difficulty]};`}
        >
            {song.title}
        </div>
        {#if krTitle}
            <div class="sub-title">
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
    }
    .sub-title {
        font-size: 10px;
        color: #5b5b5b;

        font-weight: bold;
    }

    .container[data-theme="dark"] {
        background-color: #1c1c1c;
    }

    .container[data-theme="dark"] .sub-title {
        color: rgb(193, 193, 193);
    }

    .title-container[data-crown="gold"] {
        background-color: #ffe972;
    }
    .title-container[data-crown="silver"] {
        background-color: #d4e8ff;
    }
    .title-container[data-crown="donderfull"] {
        background: linear-gradient(
            45deg,
            #ffb3ba,
            /* pink */ #ffdfba,
            /* peach */ #ffffba,
            /* yellow */ #baffc9,
            /* mint */ #bae1ff /* light blue */
        );
    }

    .badge {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 22px;
        height: 22px;
    }
</style>
