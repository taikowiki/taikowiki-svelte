<script lang="ts">
    import Loading from "$lib/components/common/Loading.svelte";
    import DonderData from "$lib/components/page/rating/me/DonderData.svelte";
    import DonderRating from "$lib/components/page/rating/me/DonderRating.svelte";
    import DonderSection from "$lib/components/page/rating/me/DonderSection.svelte";
    import SongRatings from "$lib/components/page/rating/me/SongRatings/SongRatings.svelte";
    import MeasureTable from "$lib/components/page/measures/MeasureTable.svelte";
    import { getI18N, getLang } from "$lib/module/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";

    let { data } = $props();

    if (data.logined === false) {
        location.replace(
            `/auth/login?redirect_to=${encodeURIComponent("/rating/me")}`,
        );
    }

    let opened = $state({
        songRatings: false,
        measureTable: false,
        explanation: false,
    });
    let loaded: boolean = $state(false);

    const [theme] = getTheme();
    const isMobile = getIsMobile();
    const lang = getLang();
    let i18n = $derived(getI18N("/auth/user/donder", $lang));
    let newI18n = $derived(getI18N($lang).page.donder);
</script>

<div class="container">
    {#if data.ratingDataExists}
        <div class="center">
            <div class="rating-container" data-isMobile={$isMobile}>
                <DonderData donderData={data.donderData} bind:loaded />
                <DonderRating
                    ratings={data.ratings}
                    tier={data.tier}
                    ranking={data.ranking}
                />
            </div>
            {#if loaded}
                <SongRatings
                    songRatingDatas={data.ratings.songRatingDatas}
                    songDatas={data.songDatas}
                    scoreData={data.donderData.scoreData}
                    dataForImage={{
                        donderData: data.donderData,
                        tier: data.tier,
                        ranking: data.ranking,
                        ratings: data.ratings
                    }}
                />
            {:else}
                <Loading />
            {/if}
        </div>
    {:else}
        {@render guide()}
    {/if}
</div>

{#snippet guide()}
    <div class="guide" data-theme={$theme}>
        {@html i18n.uploadGuide}
    </div>
{/snippet}

<style>
    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 100%;
    }

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

    .container :global(.guide code) {
        background-color: rgb(219, 219, 219);
        display: inline-block;
        padding-inline: 4px;
        padding-block: 3px;

        border-radius: 4px;
    }

    .container :global(.guide[data-theme="dark"] code) {
        background-color: rgb(87, 87, 87);
    }

    .container :global(.guide pre code) {
        width: 100%;
        display: block;
        overflow-x: auto;
        padding-inline: 0px;
        padding-block: 5px;
        border-radius: 0px;
    }
</style>
