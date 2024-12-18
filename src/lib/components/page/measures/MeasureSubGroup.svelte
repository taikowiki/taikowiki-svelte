<script lang="ts">
    import type { Course, SongData } from "$lib/module/common/song/types";
    import { getTheme } from "$lib/module/layout/theme";
    import type { Measure } from "@taiko-wiki/taiko-rating/src/types";
    import MeasureSong from "./MeasureSong.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    interface Props {
        subGroup: number;
        measures: Measure[];
        songDatas: (Pick<SongData, "title" | "songNo" | "genre"> & {
            courses: { oni: Course; ura: Course | null };
        })[];
    }

    let {subGroup, measures, songDatas}: Props = $props();

    const [theme] = getTheme();
    const isMobile = getIsMobile();
</script>

<div class="sub-group" data-theme={$theme} data-isMobile={$isMobile}>
    {subGroup}
</div>
<div class="container">
    {#each measures as measure}
        {@const songData = songDatas.find(
            (e) => e.songNo === measure.songno.toString(),
        )}
        {#if songData}
            <MeasureSong {songData} diff={measure.diff} />
        {/if}
    {/each}
</div>

<style>
    .sub-group {
        border-bottom: 2px solid black;

        font-size: 20px;
        font-weight: bold;

        width: calc(100% - 10px);
        margin-left: 10px;
    }
    .sub-group[data-theme="dark"] {
        border-color: "white";
    }

    .container {
        width: 100%;
        display: flex;
        flex-direction: column;

        row-gap: 5px;
    }
</style>
