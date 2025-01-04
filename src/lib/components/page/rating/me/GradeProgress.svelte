<script lang="ts">
    import { TIER_BORDER, TIER_COLOR } from "$lib/module/common/user/const";
    import { getNextTier } from "$lib/module/common/user/getTier";
    import type { UserRatingTierName } from "$lib/module/common/user/types";
    import { pipe } from "$lib/module/common/util";
    import { getTheme } from "$lib/module/layout/theme";

    interface Props {
        rating: number;
        tierName: UserRatingTierName;
        grade: 1 | 2 | 3 | 4 | 5 | null;
    }

    let { rating, tierName, grade }: Props = $props();

    const nextTier = getNextTier(tierName);

    const progress: number = pipe(tierName, [
        (tierName: UserRatingTierName) => {
            if (tierName === "omega") {
                return 100;
            }
            if (tierName === "pearl") {
                return ((rating - TIER_BORDER[tierName]) / 2255) * 100;
            }
            if (tierName === "master" || tierName === "grandmaster") {
                return ((rating - TIER_BORDER[tierName]) / 451) * 100;
            }
            if (tierName === "sapphire") {
                return (
                    ((rating -
                        (TIER_BORDER[tierName] +
                            451 * (3 - (grade as number)))) /
                        451) *
                    100
                );
            }
            return (
                ((rating -
                    (TIER_BORDER[tierName] + 451 * (5 - (grade as number)))) /
                    451) *
                100
            );
        },
    ]);

    const [theme] = getTheme();

    function getNextColor(
        grade: 1 | 2 | 3 | 4 | 5 | null,
        tierName: UserRatingTierName,
    ) {
        if (tierName === "grandmaster") {
            return "color:#00d17d;";
        }
        if (tierName === "master") {
            return `color:${TIER_COLOR[nextTier]};`;
        }
        if (grade === 1) {
            return `color:${TIER_COLOR[nextTier]};`;
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
        if (tierName === "ruby") {
            return "Sapphire3";
        } else if (tierName === "master") {
            return "GrandMaster";
        } else if (tierName === "grandmaster") {
            return "Omega";
        }
        if (grade === 1) {
            if (tierName === "sapphire") {
                return "Master";
            }
            return `${nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}5`;
        }
        return `${tierName.charAt(0).toUpperCase() + tierName.slice(1)}${grade ? grade - 1 : ""}`;
    }

    function getLeft(
        tierName: UserRatingTierName,
        grade: 1 | 2 | 3 | 4 | 5 | null,
    ) {
        if (tierName === "omega") {
            return 13530;
        }
        if (tierName === "grandmaster") {
            return 13079;
        }
        if (tierName === "master") {
            return 12628;
        }
        if (tierName === "sapphire") {
            return TIER_BORDER[tierName] + 451 * (3 - (grade ?? 0));
        }
        return TIER_BORDER[tierName] + 451 * (5 - (grade ?? 0));
    }

    function getRight(
        tierName: UserRatingTierName,
        grade: 1 | 2 | 3 | 4 | 5 | null,
    ) {
        if (tierName === "pearl") {
            return 2255;
        }
        if (tierName === "grandmaster") {
            return 13530;
        }
        if (tierName === "master") {
            return 13079;
        }
        if (tierName === "sapphire") {
            return TIER_BORDER[tierName] + 451 * (4 - (grade || 0));
        }
        return TIER_BORDER[tierName] + 451 * (6 - (grade || 0));
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
        {getLeft(tierName, grade)}
    </span>
    {#if tierName !== "omega"}
        <span
            class="next"
            style={getNextColor(grade, tierName)}
            data-theme={$theme}
        >
            {getRight(tierName, grade)}({getNextGrade(grade, tierName)})
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
