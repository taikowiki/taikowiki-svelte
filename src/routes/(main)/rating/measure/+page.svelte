<script lang="ts">
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import MobileDefaultAd from "$lib/components/layout/ads/MobileDefaultAd.svelte";
    import MeasureTable from "$lib/components/page/measures/MeasureTable.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n.js";

    let { data } = $props();

    const lang = getLang();
    let i18n = $derived(getI18N($lang).page.rating.measures);
    let titleI18n = $derived(getI18N($lang).title["/rating/measure"]);
</script>

<PageTitle title={titleI18n} />

<h2>
    {i18n.heading}
</h2>
<MobileDefaultAd />
<MeasureTable measures={data.measures} songDatas={data.songDatas} />
