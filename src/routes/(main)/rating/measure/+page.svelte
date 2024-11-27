<script lang="ts">
    import PageTitle from "$lib/components/common/PageTitle.svelte";
import MeasureTable from "$lib/components/page/measures/MeasureTable.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n.js";

    export let data;

    const lang = getLang();
    $: i18n = getI18N($lang).page.rating.measures
    $: titleI18n = getI18N($lang).title['/rating/measure']
</script>

<PageTitle title={titleI18n}/>

<h2>
    {i18n.heading}
</h2>
<MeasureTable measures={data.measures} songDatas={data.songDatas} />
