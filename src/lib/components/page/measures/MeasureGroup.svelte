<script lang="ts">
    import type { Course, SongData } from "$lib/module/common/song/types";
    import type { Measure } from "@taiko-wiki/taiko-rating/src/types";
    import createSSC from "styled-svelte-component/svelte4";
    import groupBy from "object.groupby";
    import MeasureSubGroup from "./MeasureSubGroup.svelte";

    export let group: number;
    export let measures: Measure[];
    export let songDatas: (Pick<SongData, "title" | "songNo" | "genre"> & {
        courses: { oni: Course; ura: Course | null };
    })[];

    function getColor(g: number) {
        const one = [0, 18, 214];
        const twelve = [214, 0, 0];

        const rgb = one.map((v, i) => {
            if (v > twelve[i]) {
                const gap = v - twelve[i];

                return v - (gap / 11) * (g - 1);
            } else {
                const gap = twelve[i] - v;

                return v + (gap / 11) * (g - 1);
            }
        });

        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }

    const subGroupedMeasures = groupBy(
        measures,
        (measure) => measure.measureValue,
    );

    const GroupTitle = createSSC<{ group: number; }>(
        "div",
        ({ group }) => `
    border-bottom:3px solid ${getColor(group)};
    font-size: 25px;
    font-weight: bold;
    cursor: pointer;
    display:flex;
    align-items: center;
    column-gap: 3px;`,
    );
</script>

<GroupTitle
    {group}
>
    {group}
</GroupTitle>
{#each Object.entries(subGroupedMeasures).toSorted((a, b) => Number(b[0]) - Number(a[0])) as [subGroup, measures]}
    <MeasureSubGroup subGroup={Number(subGroup)} {measures} {songDatas} />
{/each}
