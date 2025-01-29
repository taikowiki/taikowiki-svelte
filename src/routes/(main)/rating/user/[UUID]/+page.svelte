<script lang="ts">
    import Loading from "$lib/components/common/Loading.svelte";
    import MobileDefaultAd from "$lib/components/layout/ads/MobileDefaultAd.svelte";
    import DonderSection from "$lib/components/page/rating/me/DonderSection.svelte";
    import OtherDonderData from "$lib/components/page/rating/user/OtherDonderData.svelte";
    import OtherDonderRating from "$lib/components/page/rating/user/OtherDonderRating.svelte";
    import OtherSongRatings from "$lib/components/page/rating/user/OtherSongRatings.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n.js";
    import { getTier } from "$lib/module/common/user/getTier.js";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    let { data } = $props();

    const donder = {
        nickname: data.otherDonderData.nickname,
        taikoNumber: data.otherDonderData.taikoNumber,
    };
    const tier = getTier(data.otherDonderData.currentRating);

    let loaded = $state(false);
    let songOpened = $state(false);

    const isMobile = getIsMobile();
    const lang = getLang();
    let newI18n = $derived(getI18N($lang).page.donder);
    let i18n = $derived(getI18N($lang).page.rating.user);
</script>

{#snippet donderView()}
    <div class="donder-container" data-isMobile={$isMobile}>
        <OtherDonderData {donder} bind:loaded />
        <OtherDonderRating
            currentRating={data.otherDonderData.currentRating}
            currentExp={data.otherDonderData.currentExp}
            {tier}
        />
    </div>
{/snippet}
{#snippet songRatings()}
    {#if data.otherDonderData.ratingData && data.otherDonderData.scoreData}
        <DonderSection
            bind:opened={songOpened}
            sectionName={newI18n.section.song}
        >
            <OtherSongRatings
                songDatas={data.songDatas}
                scoreData={data.otherDonderData.scoreData}
                ratingData={data.otherDonderData.ratingData}
            />
        </DonderSection>
    {/if}
{/snippet}

<MobileDefaultAd />
<div class="container">
    {@render donderView()}
    {#if data.otherDonderData.ratingData && data.otherDonderData.scoreData}
        {#if loaded}
            {@render songRatings()}
        {:else}
            <Loading />
        {/if}
    {:else}
        <div class="nondisclosure">
            {i18n.nondisclosure}
        </div>
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .donder-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }
    .donder-container[data-isMobile="true"] {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 10px;
    }

    .nondisclosure {
        margin-top: 10px;
        font-weight: bold;
        font-size: 18px;
    }
</style>
