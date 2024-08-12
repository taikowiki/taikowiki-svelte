<script lang="ts">
    import type { Course, SongData } from "$lib/module/common/song/types";
    import type { Measure } from "@taiko-wiki/taiko-rating/src/types";
    import groupBy from "object.groupby";
    import MeasureGroup from "./MeasureGroup.svelte";

    export let measures: Measure[];
    export let songDatas: (Pick<SongData, 'title' | 'songNo' | 'genre'> & {courses: {oni: Course; ura: Course | null;}})[];

    //@ts-expect-error
    const groupedMeasures = groupBy(measures, measure => measure['상수대역'] ?? measure['상수내림']);
</script>

<h1>
    <span>
        보면 상수표
    </span>
    <a href="/auth/user/donder">
        동더 데이터
    </a>
</h1>

{#each Object.entries(groupedMeasures).toSorted((a, b) => Number(b[0]) - Number(a[0])) as [group, measures]}
    <MeasureGroup group={Number(group)} {measures} {songDatas}/>
{/each}

<style>
    h1{
        display:flex;
        justify-content: space-between;
        align-items: center;
    }

    a{
        font-size: 16px;
    }
</style>