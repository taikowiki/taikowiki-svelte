<script lang="ts">
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import MeasureTable from "$lib/components/page/measures/MeasureTable.svelte";
    import { getI18N, getLang } from "$lib/module/i18n";

    let { data } = $props();

    const lang = getLang();
    let i18n = $derived(getI18N($lang).page.rating.measures);
    let titleI18n = $derived(getI18N($lang).title["/rating/measure"]);
</script>

<PageTitle title={titleI18n} />

<h2>
    {i18n.heading}
</h2>
<MeasureTable measures={data.measures} songDatas={data.songDatas} />
