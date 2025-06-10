<script lang="ts">
    import { GRADE_INTERVAL, TIER_BORDER, TIER_COLOR, TIER_INTERVAL } from "$lib/module/common/user/const";
    import { getNextTier } from "$lib/module/common/user/getTier";
    import type { UserRatingTierName } from "$lib/module/common/user/types";
    import { Util } from "$lib/module/util";
    import { getTheme } from "$lib/module/layout/theme";

    interface Props {
        rating: number;
        tierName: UserRatingTierName;
    }

    let { rating, tierName }: Props = $props();

    const nextTier = getNextTier(tierName);

    let progress: number = Util.pipe(tierName, [(tierName: UserRatingTierName) => {
        if(tierName === "omega"){
            return 100;
        }
        if(tierName === "master" || tierName === "grandmaster"){
            return ((rating - TIER_BORDER[tierName]) / GRADE_INTERVAL) * 100;
        }
        if(tierName === "sapphire"){
            return ((rating - TIER_BORDER[tierName]) / (GRADE_INTERVAL * 3)) * 100;
        }

        return ((rating - TIER_BORDER[tierName]) / TIER_INTERVAL) * 100;
    }])

    const [theme] = getTheme();
</script>

<div class="container">
    <span
        class="current"
        style={tierName === "pearl"
            ? ""
            : tierName === "omega"
              ? "color:#00d17d;"
              : `color:${TIER_COLOR[tierName]}`}
        data-theme={$theme}
    >
        {TIER_BORDER[tierName]}
    </span>
    {#if tierName !== "omega"}
        <span
            class="next"
            style={tierName === "grandmaster"
                ? "color:#00d17d;"
                : `color:${TIER_COLOR[nextTier]};`}
            data-theme={$theme}
        >
            {TIER_BORDER[nextTier]}({nextTier.charAt(0).toUpperCase() +
                nextTier.slice(1)})
        </span>
    {/if}
    <div class="progress-container">
        <div
            class="progress"
            style={`width:${progress}%;` +
                (tierName === "omega"
                    ? "background: linear-gradient(90deg, rgba(255,160,254,1) 0%, rgba(86,251,185,1) 50%, rgba(99,171,248,1) 100%);"
                    : `background:${TIER_COLOR[tierName]};`)}
        ></div>
    </div>
</div>

<style>
    .container {
        width: 100%;

        position: relative;
    }

    .current {
        position: absolute;
        top: 0;
        left: 0%;
        font-weight: bold;
    }
    .next {
        position: absolute;
        top: 0;
        left: 100%;
        transform: translateX(-100%);
        font-weight: bold;
    }

    .progress-container {
        width: 100%;
        height: 7px;

        background-color: rgb(190, 190, 190);
        border-radius: 50vh;
        margin-top: 25px;

        position: relative;
    }

    .progress {
        position: absolute;
        top: 0;
        left: 0;
        height: 7px;
        border-radius: 50vh;
    }
</style>
