<script lang="ts">
    import type { Course, Genre, SongData } from "$lib/module/common/song/types";
    import type { Measure } from "@taiko-wiki/taiko-rating/src/types";
    import groupBy from "object.groupby";
    import MeasureGroup from "./MeasureGroup.svelte";
    import createSSC from "styled-svelte-component/svelte4";
    import color from "$lib/module/common/color";
    import { setContext } from "svelte";

    export let measures: Measure[];
    export let songDatas: (Pick<SongData, "title" | "songNo" | "genre"> & {
        courses: { oni: Course; ura: Course | null };
    })[];

    const groupedMeasures = groupBy(
        measures,
        //@ts-expect-error
        (measure) => measure["상수대역"] ?? measure["상수내림"],
    );

    const Genre = createSSC<{ genre: Genre[] }, {}>(
        "div",
        ({ genre }) => `
        background: linear-gradient(${genre.length === 1 ? `${color.genre[genre[0]]}, ${color.genre[genre[0]]}` : genre.map((g, i) => `${color.genre[g]} calc(100% / ${genre.length} * ${i}), ${color.genre[g]} calc(100% / ${genre.length} * ${i + 1})`).join(", ")});`,
        () => `    
        width: 8px;
        height: 100%;
        min-height: 30px;
        border-radius: 50vh;`,
    );

    const Level = createSSC<{ diff: "oni" | "ura" }, {}>(
        "div",
        ({ diff }) => `
        background-color:${color.difficulty[diff]};`,
        () => `
        color:white;
        display:flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color:white;
        width: 42px;
        height: calc(100% - 8px);
        padding-inline: 3px;
        border-radius: 3px;
        & span{
            transform: translateY(-1px);
        }`,
    );
    
    setContext('Genre', Genre);
    setContext('Level', Level);
</script>

<Genre.common/>
<Level.common/>

<h1>
    <span> 보면 상수표 </span>
    <a href="/auth/user/donder"> 동더 데이터 </a>
</h1>

{#each Object.entries(groupedMeasures).toSorted((a, b) => Number(b[0]) - Number(a[0])) as [group, measures]}
    <MeasureGroup group={Number(group)} {measures} {songDatas} />
{/each}

<style>
    h1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    a {
        font-size: 16px;
    }
</style>
