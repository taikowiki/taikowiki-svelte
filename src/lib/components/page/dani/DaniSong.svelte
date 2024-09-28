<script lang="ts" context="module">
    import color from "$lib/module/common/color";

    function getGenreColors(genre: Genre[]): string {
        if (genre.length === 1) {
            return `${color.genre[genre[0]]}`;
        }
        if (genre.length === 2) {
            return `linear-gradient(${color.genre[genre[0]]} 0%, ${color.genre[genre[0]]} 50%, ${color.genre[genre[1]]} 50%, ${color.genre[genre[1]]} 100%)`;
        }
        return `linear-gradient(${color.genre[genre[0]]} 0%, ${color.genre[genre[0]]} 33%, ${color.genre[genre[1]]} 33%, ${color.genre[genre[1]]} 66%, ${color.genre[genre[2]]} 66%, ${color.genre[genre[2]]} 100%)`;
    }
</script>

<script lang="ts">
    import type { DaniSong } from "$lib/module/common/dani/types";
    import type { Genre } from "$lib/module/common/song/types";
    import { getTheme } from "$lib/module/layout/theme";
    import type { SongDataPickedForDani } from "$lib/module/common/dani/types";
    import { DifficultyColor } from "$lib/module/common/styled";

    export let song: DaniSong;
    export let songDatas: SongDataPickedForDani[];

    const [theme] = getTheme();

    const songData = songDatas.find(
        (songData) => songData.songNo === song.songNo
    );
    const genre = songData?.genre ?? [];
    const title = songData?.title ?? "-";
    const level = songData?.courses?.[song.difficulty]?.level ?? ' -';
    const combo =
        songData?.courses?.[song.difficulty]?.maxCombo?.toString() ?? "-";
</script>

<a
    class="container"
    style={`background:${getGenreColors(genre)};`}
    href={`/song/${song.songNo}?diff=${song.difficulty}`}
>
    <div class="container2" data-theme={$theme}>
        <div class="title">
            {title}
        </div>
        <DifficultyColor difficulty={song.difficulty}>
            ★{level}
        </DifficultyColor>
        <div class="combo">
            <span>
                {combo}
            </span>
        </div>
    </div>
</a>

<style>
    .container {
        width: 100%;

        display: flex;
        flex-direction: row;

        justify-content: flex-end;

        border-radius: 5px;

        text-decoration: none;
    }

    .container2 {
        width: calc(100% - 8px);

        min-height: 35px;

        background-color: white;
        color: black;

        display: flex;
        align-items: center;

        border-radius: 5px;

        padding-inline: 5px;

        box-sizing: border-box;

        font-size: 15px;

        font-weight: bold;

        column-gap: 5px;
    }
    .container2[data-theme="dark"] {
        background-color: #1c1c1c;
        color: white;
    }

    .title {
        transform: translateY(-1px);
        flex: 1 0 auto;
        max-width: calc(100% - 90px);
    }

    .combo {
        width: 40px;
        height: 18px;

        font-size: 14px;

        box-sizing: border-box;

        padding-inline: 5px;

        border-radius: 3px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    span {
        transform: translateY(-1px);
    }
</style>
