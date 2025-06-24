<script lang="ts">
    import PageTitle from '$lib/components/common/PageTitle.svelte';
    import GamecenterReport from '$lib/components/page/gamecenter/report/GamecenterReport.svelte'
    import { getI18N, getLang } from '$lib/module/i18n';

    const lang = getLang();
    $: titleI18n = getI18N('other', $lang).title['/gamecenter/report']
</script>

<PageTitle title={titleI18n}/>

<GamecenterReport/>