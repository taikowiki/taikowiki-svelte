<script lang="ts">
    import { Song } from "$lib/module/song";
    import type { Measure } from "@taiko-wiki/taiko-rating/types";
    import styled from "styled-svelte5";
    import groupBy from "object.groupby";
    import MeasureSubGroup from "./MeasureSubGroup.svelte";

    interface Props {
        group: number;
        measures: Measure[];
        songDatas: (Pick<Song.SongData, "title" | "songNo" | "genre"> & {
            courses: { oni: Song.Course; ura: Song.Course | null };
        })[];
    }

    let { group, measures, songDatas }: Props = $props();

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

    const GroupTitle = styled<{ group: number }>(
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

<GroupTitle {group}>
    {group}
</GroupTitle>
{#each Object.entries(subGroupedMeasures).toSorted((a, b) => Number(b[0]) - Number(a[0])) as [subGroup, measures]}
    <MeasureSubGroup subGroup={Number(subGroup)} {measures} {songDatas} />
{/each}
