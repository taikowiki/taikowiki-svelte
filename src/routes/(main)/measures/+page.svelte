<script lang="ts">
    import { browser } from "$app/environment";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import MeasureTable from "$lib/components/page/measures/MeasureTable.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n.js";
    import type { Measure } from "@taiko-wiki/taiko-rating/src/types.js";

    export let data;

    const { measures, songDatas } = data as { measures: Measure[] } & typeof data;

    const lang = getLang();
    $: titleI18n = getI18N('other', $lang).title['/measures'];
</script>

<PageTitle title={titleI18n}/>

{#if browser}
    <MeasureTable {measures} {songDatas}/>
{:else}
    <a href="https://raw.githubusercontent.com/taikowiki/taiko-fumen-measure-table/main/main.csv" rel="external">
        Check Github
    </a>
{/if}
