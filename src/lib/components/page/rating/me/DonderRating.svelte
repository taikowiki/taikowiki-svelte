<script lang="ts">
    import { getRating } from "@taiko-wiki/taiko-rating";
    import { TIER_COLOR } from "$lib/module/common/user/const";
    import { getTier } from "$lib/module/common/user/getTier";
    import TierImage from "./TierImage.svelte";
    import TierProgress from "./TierProgress.svelte";
    import GradeProgress from "./GradeProgress.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";

    interface Props {
        ratings: ReturnType<typeof getRating>;
        tier: ReturnType<typeof getTier>;
        ranking: { count: number; ranking: number };
    }

    let { ratings, tier, ranking }: Props = $props();

    const lang = getLang();
    let i18n = $derived(getI18N($lang).page.donder.rating);
</script>

<div class="container">
    <TierImage tierName={tier.tierName} grade={tier.detailTierGrade} />
    <div class="exp-rating-container">
        <div class="exp">
            <span> exp </span>
            {ratings?.exp}
        </div>
        <div
            class="rating"
            style={tier.tierName === "omega"
                ? ""
                : `background:${TIER_COLOR[tier.tierName]}`}
            class:pearl={tier.tierName === "pearl"}
            class:omega={tier.tierName === "omega"}
        >
            <span>
                {ratings.rating}
            </span>
        </div>
    </div>
    <GradeProgress
        rating={ratings.rating}
        tierName={tier.tierName}
        grade={tier.detailTierGrade}
    />
    {#if tier.tierName !== "omega" && tier.tierName !== "grandmaster" && tier.tierName !== "master"}
        <TierProgress rating={ratings.rating} tierName={tier.tierName} />
    {/if}
    <div class="ranking">
        {i18n.top}
        {Math.round((ranking.ranking / ranking.count) * 10000) / 100}%
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 300px;
        max-width: 100%;
        row-gap: 5px;
    }

    .exp-rating-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        column-gap: 5px;
    }

    .exp {
        font-size: 13px;
        color: rgb(129, 129, 129);
    }
    .rating {
        height: 26px;

        flex: 1 1 auto;
        display: flex;
        justify-content: center;
        align-items: center;

        color: white;
        font-weight: bold;
        font-size: 18px;

        border-radius: 5px;
    }
    .rating > span {
        transform: translateY(-1px);
    }
    .rating.pearl {
        color: black;
        box-sizing: border-box;
    }
    .rating.omega {
        background: linear-gradient(
            90deg,
            rgba(255, 160, 254, 1) 0%,
            rgba(86, 251, 185, 1) 50%,
            rgba(99, 171, 248, 1) 100%
        );
        color: #95003c;
    }

    .ranking {
        font-size: 14px;
    }
</style>
