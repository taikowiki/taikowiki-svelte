<script lang="ts">
    import type { UserDonderData } from "$lib/module/common/user/types";
    import { getRating, fetchMeasures } from "@taiko-wiki/taiko-rating";
    import type { Measure } from "@taiko-wiki/taiko-rating/src/types";
    import { TIER_COLOR } from "$lib/module/common/user/const";
    import { getTier } from "$lib/module/common/user/getTier";
    import TierImage from "./TierImage.svelte";
    import TierProgress from "./TierProgress.svelte";
    import GradeProgress from "./GradeProgress.svelte";
    import Loading from "$lib/components/common/Loading.svelte";

    export let donderData: UserDonderData;
    export let ratingResult: ReturnType<typeof getRating>;

    let measures: Measure[];
    let tier: ReturnType<typeof getTier>;
    const f = async () => {
        if (donderData.scoreData === null) {
            throw new Error("NO_SCOREDATA");
        } else {
            measures = await fetchMeasures();
            ratingResult = getRating(donderData.scoreData, measures);
            tier = getTier(ratingResult.rating);
        }
    };

    export let Container: ConstructorOfATypedSvelteComponent;
</script>

{#await f()}
    <img src="/assets/icon/loading.svg" alt="loading" />
{:then}
    <Container>
        <TierImage tierName={tier.tierName} grade={tier.detailTierGrade} />
        <div class="exp-rating-container">
            <div class="exp">
                <span> exp </span>
                {ratingResult?.exp}
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
                    {ratingResult.rating}
                </span>
            </div>
        </div>
        <GradeProgress
            rating={ratingResult.rating}
            tierName={tier.tierName}
            grade={tier.detailTierGrade}
        />
        <TierProgress rating={ratingResult.rating} tierName={tier.tierName} />
    </Container>
{:catch err}
    {#if err.message === "NO_SCOREDATA"}
        점수데이터가 없습니다.
    {/if}
{/await}

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
</style>
