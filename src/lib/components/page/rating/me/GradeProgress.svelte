<script lang="ts">
    import { TIER_BORDER, TIER_COLOR } from "$lib/module/common/user/const";
    import { getNextTier } from "$lib/module/common/user/getTier";
    import type { UserRatingTierName } from "$lib/module/common/user/types";
    import { getTheme } from "$lib/module/layout/theme";

    interface Props {
        rating: number;
        tierName: UserRatingTierName;
        grade: 1 | 2 | 3 | 4 | 5 | null;
    }

    let { rating, tierName, grade }: Props = $props();

    const nextTier = getNextTier(tierName);

    const progress: number =
        tierName === "omega"
            ? 100
            : tierName === "pearl"
              ? ((rating - TIER_BORDER[tierName]) / 2255) * 100
              : ((rating -
                    (TIER_BORDER[tierName] + 451 * (5 - (grade as number)))) /
                    451) *
                100;

    const [theme] = getTheme();

    function getNextColor(
        grade: 1 | 2 | 3 | 4 | 5 | null,
        tierName: UserRatingTierName,
    ) {
        if (grade === 1) {
            if (tierName === "sapphire") {
                return "color:#00d17d;";
            } else {
                return `color:${TIER_COLOR[nextTier]};`;
            }
        }
        if (tierName === "pearl") {
            return `color:${TIER_COLOR.bronze};`;
        }
        return `color:${TIER_COLOR[tierName]};`;
    }

    function getNextGrade(
        grade: 1 | 2 | 3 | 4 | 5 | null,
        tierName: UserRatingTierName,
    ) {
        if (tierName === "pearl") {
            return "Bronze5";
        }
        if (grade === 1) {
            if (tierName === "sapphire") {
                return "Omega";
            } else {
                return `${nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}5`;
            }
        }
        return `${tierName.charAt(0).toUpperCase() + tierName.slice(1)}${grade ? grade - 1 : ""}`;
    }
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
        {tierName === "omega"
            ? 13530
            : tierName === "pearl"
              ? 0
              : TIER_BORDER[tierName] + 451 * (5 - (grade ?? 0))}
    </span>
    {#if tierName !== "omega"}
        <span
            class="next"
            style={getNextColor(grade, tierName)}
            data-theme={$theme}
        >
            {tierName === "pearl"
                ? 2255
                : TIER_BORDER[tierName] +
                  451 * (6 - (grade || 0))}({getNextGrade(grade, tierName)})
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
