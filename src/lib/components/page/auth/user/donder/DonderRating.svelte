<script lang="ts">
    import { getRating } from "@taiko-wiki/taiko-rating";
    import { TIER_COLOR } from "$lib/module/common/user/const";
    import { getTier } from "$lib/module/common/user/getTier";
    import TierImage from "./TierImage.svelte";
    import TierProgress from "./TierProgress.svelte";
    import GradeProgress from "./GradeProgress.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";

    export let ratings: ReturnType<typeof getRating>;
    export let tier: ReturnType<typeof getTier>;
    export let Container: ConstructorOfATypedSvelteComponent;
    export let rankingData: {count: number; ranking: number}

    const lang = getLang();
    $: i18n = getI18N($lang).page.donder.rating
</script>

<Container>
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
    <TierProgress rating={ratings.rating} tierName={tier.tierName} />
    <div class="ranking">
        {i18n.top} {Math.round((rankingData.ranking / rankingData.count) * 10000) / 100}%
    </div>
</Container>

<style>
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

    .ranking{
        font-size: 14px;
    }
</style>
