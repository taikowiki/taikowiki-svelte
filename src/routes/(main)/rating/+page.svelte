<script lang="ts">
    import DonderData from "$lib/components/page/rating/me/DonderData.svelte";
    import DonderRating from "$lib/components/page/rating/me/DonderRating.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    export let data;

    const lang = getLang();
    $: i18n = getI18N("/auth/user/donder", $lang);
    const isMobile = getIsMobile();
</script>

{#if data.ratingDataExists}
    <div class="rating-container" data-isMobile={$isMobile}>
        <DonderData donderData={data.donderData} />
        <DonderRating
            ratings={data.ratings}
            tier={data.tier}
            ranking={data.ranking}
        />
    </div>
{/if}
{@html i18n.explanation}

<style>
    .rating-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
    .rating-container[data-isMobile="true"] {
        flex-direction: column;
        align-items: center;
        row-gap: 10px;
    }
</style>
