<script lang="ts">
    import { page } from "$app/stores";
    import RatingRanking from "$lib/components/page/rating/ranking/RatingRanking.svelte";
    import RatingRankingPageSelector from "$lib/components/page/rating/ranking/RatingRankingPageSelector.svelte";

    export let data;
    const pageNum = Number($page.params.page);
</script>

<h2>랭킹</h2>
{#if data.rankings.length !== 0}
    <RatingRanking rankings={data.rankings} page={pageNum} />
    <RatingRankingPageSelector {pageNum} length={data.count}/>
{:else}
    <p>데이터가 없습니다.</p>
{/if}
