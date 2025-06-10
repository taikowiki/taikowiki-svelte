<script lang="ts">
    import type {
        Course,
        Genre,
        SongData,
    } from "$lib/module/common/song/types";
    import type { Measure } from "@taiko-wiki/taiko-rating/types";
    import groupBy from "object.groupby";
    import MeasureGroup from "./MeasureGroup.svelte";
    import styled from "styled-svelte5";
    import { Util } from "$lib/module/util";
    import { setContext } from "svelte";
    import { getI18N, getLang } from "$lib/module/i18n";

    interface Props {
        measures: Measure[];
        songDatas: (Pick<SongData, "title" | "songNo" | "genre"> & {
            courses: { oni: Course; ura: Course | null };
        })[];
    }

    let { measures, songDatas }: Props = $props();

    const groupedMeasures = groupBy(measures, (measure) => measure.range);

    const GenreDiv = styled<{ genre: Genre[] }, {}>(
        "div",
        ({ genre }) => `
        background: linear-gradient(${genre.length === 1 ? `${Util.Color.genre[genre[0]]}, ${Util.Color.genre[genre[0]]}` : genre.map((g, i) => `${Util.Color.genre[g]} calc(100% / ${genre.length} * ${i}), ${Util.Color.genre[g]} calc(100% / ${genre.length} * ${i + 1})`).join(", ")});`,
        () => `    
        width: 8px;
        height: 100%;
        min-height: 30px;
        border-radius: 50vh;`,
    );

    const Level = styled<{ diff: "oni" | "ura" }, {}>(
        "div",
        ({ diff }) => `
        background-color:${Util.Color.difficulty[diff]};
        `,
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

    setContext("Genre", GenreDiv);
    setContext("Level", Level);

    const lang = getLang();
</script>

<GenreDiv.common />
<Level.common />

{#each Object.entries(groupedMeasures).toSorted((a, b) => Number(b[0]) - Number(a[0])) as [group, measures]}
    <MeasureGroup group={Number(group)} {measures} {songDatas} />
{/each}
