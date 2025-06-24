<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import PageSelector from "$lib/components/common/PageSelector.svelte";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import RatingRanking from "$lib/components/page/rating/ranking/RatingRanking.svelte";
    import { getI18N, getLang } from "$lib/module/i18n";

    let { data } = $props();
    const pageNum = Number($page.params.page);

    const lang = getLang();
    let i18n = $derived(getI18N($lang).page.rating.ranking);
    let titleI18n = $derived(getI18N($lang).title["/rating/ranking"]);

    function movePage(p: number) {
        goto(`/rating/ranking/${p}`);

        window.scrollTo({
            top: 0,
        });
    }
</script>

<PageTitle title={titleI18n} />

<h2>
    {i18n.heading}
</h2>
{#if data.rankings.length !== 0}
    <RatingRanking rankings={data.rankings} page={pageNum} />
    <PageSelector {pageNum} length={data.count} {movePage} countPerPage={50}/>
{:else}
    <p>데이터가 없습니다.</p>
{/if}
