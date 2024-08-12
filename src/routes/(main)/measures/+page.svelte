<script lang="ts">
    import { browser } from "$app/environment";
    import MeasureTable from "$lib/components/page/measures/MeasureTable.svelte";
    import type { Measure } from "@taiko-wiki/taiko-rating/src/types.js";

    export let data;

    const { measures, songDatas } = data as { measures: Measure[] } & typeof data;

</script>

{#if browser}
    <MeasureTable {measures} {songDatas}/>
{:else}
    <a href="https://raw.githubusercontent.com/taikowiki/taiko-fumen-measure-table/main/main.csv" rel="external">
        Check Github
    </a>
{/if}
