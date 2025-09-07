<script lang="ts">
    import Loading from "$lib/components/common/Loading.svelte";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import DonderSection from "$lib/components/page/rating/me/DonderSection.svelte";
    import OtherDonderData from "$lib/components/page/rating/user/OtherDonderData.svelte";
    import OtherDonderRating from "$lib/components/page/rating/user/OtherDonderRating.svelte";
    import OtherSongRatings from "$lib/components/page/rating/user/OtherSongRatings.svelte";
    import { getI18N, getLang } from "$lib/module/i18n";
    import { User } from "$lib/module/user/index.js";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    let { data } = $props();

    const donder = {
        nickname: data.otherDonderData.nickname,
        taikoNumber: data.otherDonderData.taikoNumber,
    };
    const tier = User.getTier(data.otherDonderData.currentRating);

    let loaded = $state(false);
    let songOpened = $state(false);

    const isMobile = getIsMobile();
    const lang = getLang();
    let newI18n = $derived(getI18N($lang).page.donder);
    let i18n = $derived(getI18N($lang).page.rating.user);
</script>

<PageTitle title={donder.nickname ?? donder.taikoNumber ?? "동더"} />
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
        <OtherSongRatings
            songDatas={data.songDatas}
            scoreData={data.otherDonderData.scoreData}
            songRatingDatas={data.otherDonderData.ratingData}
        />
    {/if}
{/snippet}

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
