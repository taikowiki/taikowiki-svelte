<script lang="ts">
    import type {
        Course,
        Genre,
        SongData,
    } from "$lib/module/common/song/types";
    import color from "$lib/module/common/color";
    import createSSC from "styled-svelte-component/svelte4";
    import { getTheme } from "$lib/module/layout/theme";

    export let songData: (Pick<SongData, "title" | "songNo" | "genre"> & {
        courses: { oni: Course; ura: Course | null };
    }) & { diff?: "oni" | "ura" };

    const [theme] = getTheme();

    const Genre = createSSC<{ genre: Genre[] }>(
        "div",
        ({ genre }) => `
    background: linear-gradient(${genre.length === 1 ? `${color.genre[genre[0]]}, ${color.genre[genre[0]]}` : genre.map((g, i) => `${color.genre[g]} calc(100% / ${genre.length} * ${i}), ${color.genre[g]} calc(100% / ${genre.length} * ${i + 1})`).join(", ")});
    width: 8px;
    height: 100%;
    min-height: 30px;
    border-radius: 50vh;`,
    );

    const Level = createSSC<{ diff: "oni" | "ura" }>(
        "div",
        ({ diff }) => `
    color:white;
    background-color:${color.difficulty[diff]};
    display:flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color:white;
    width: 42px;
    height: 22px;
    padding-inline: 3px;
    border-radius: 3px;
    & span{
        transform: translateY(-1px);
    }
    `,
    );
</script>

<a class="song-container" href={`/song/${songData.songNo}`} data-theme={$theme}>
    <Genre genre={songData.genre} />
    <Level diff={songData.diff ?? "oni"}>
        <span>
            ★{songData.courses[songData.diff ?? "oni"]?.level ?? '??'}
        </span>
    </Level>
    <div class="title" data-theme={$theme}>
        {songData.title}
    </div>
</a>

<style>
    .song-container {
        width: calc(100% - 10px);
        min-height: 30px;
        display: flex;
        align-items: center;
        column-gap: 4px;

        margin-left: 10px;
        background-color: #ededed;

        border-radius: 5px;
    }
    .song-container[data-theme="dark"] {
        background-color: #1c1c1c;
    }

    .title {
        font-weight: bold;
        transform: translateY(-1px);
        flex: 1 0 auto;
    }
</style>
