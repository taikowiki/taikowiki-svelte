<script lang="ts">
    import { User } from "$lib/module/user";
    import { Util } from "$lib/module/util";
    import { getTheme } from "$lib/module/layout/theme";

    interface Props {
        rating: number;
        tierName: User.RatingTierName;
        grade: 1 | 2 | 3 | 4 | 5 | null;
    }

    let { rating, tierName, grade }: Props = $props();

    const nextTier = User.getNextTier(tierName);

    const progress: number = Util.pipe(tierName, [
        (tierName: User.RatingTierName) => {
            if (tierName === "omega") {
                return 100;
            }
            if (tierName === "pearl") {
                return ((rating - User.TIER_BORDER[tierName]) / User.TIER_BORDER.bronze) * 100;
            }
            if (tierName === "master" || tierName === "grandmaster") {
                return ((rating - User.TIER_BORDER[tierName]) / User.GRADE_INTERVAL) * 100;
            }
            if (tierName === "sapphire") {
                return (
                    ((rating -
                        (User.TIER_BORDER[tierName] +
                            User.GRADE_INTERVAL * (3 - (grade as number)))) /
                        User.GRADE_INTERVAL) *
                    100
                );
            }
            return (
                ((rating -
                    (User.TIER_BORDER[tierName] + User.GRADE_INTERVAL * (5 - (grade as number)))) /
                    User.GRADE_INTERVAL) *
                100
            );
        },
    ]);

    const [theme] = getTheme();

    function getNextColor(
        grade: 1 | 2 | 3 | 4 | 5 | null,
        tierName: User.RatingTierName,
    ) {
        if (tierName === "grandmaster") {
            return "color:#00d17d;";
        }
        if (tierName === "master") {
            return `color:${User.TIER_COLOR[nextTier]};`;
        }
        if (grade === 1) {
            return `color:${User.TIER_COLOR[nextTier]};`;
        }
        if (tierName === "pearl") {
            return `color:${User.TIER_COLOR.bronze};`;
        }
        return `color:${User.TIER_COLOR[tierName]};`;
    }

    function getNextGrade(
        grade: 1 | 2 | 3 | 4 | 5 | null,
        tierName: User.RatingTierName,
    ) {
        if (tierName === "pearl") {
            return "Bronze5";
        }
        if (tierName === "master") {
            return "GrandMaster";
        }
        if (tierName === "grandmaster") {
            return "Omega";
        }
        if (grade === 1) {
            if (tierName === "sapphire") {
                return "Master";
            }
            if (tierName === "ruby") {
                return "Sapphire3";
            }
            return `${nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}5`;
        }
        return `${tierName.charAt(0).toUpperCase() + tierName.slice(1)}${grade ? grade - 1 : ""}`;
    }

    function getLeft(
        tierName: User.RatingTierName,
        grade: 1 | 2 | 3 | 4 | 5 | null,
    ) {
        if (tierName === "omega") {
            return User.TIER_BORDER.omega;
        }
        if (tierName === "grandmaster") {
            return User.TIER_BORDER.grandmaster;
        }
        if (tierName === "master") {
            return User.TIER_BORDER.master;
        }
        if (tierName === "sapphire") {
            return User.TIER_BORDER[tierName] + User.GRADE_INTERVAL * (3 - (grade ?? 0));
        }
        return User.TIER_BORDER[tierName] + User.GRADE_INTERVAL * (5 - (grade ?? 0));
    }

    function getRight(
        tierName: User.RatingTierName,
        grade: 1 | 2 | 3 | 4 | 5 | null,
    ) {
        if (tierName === "pearl") {
            return User.TIER_BORDER.bronze;
        }
        if (tierName === "grandmaster") {
            return User.TIER_BORDER.omega;
        }
        if (tierName === "master") {
            return User.TIER_BORDER.grandmaster;
        }
        if (tierName === "sapphire") {
            return User.TIER_BORDER[tierName] + User.GRADE_INTERVAL * (4 - (grade || 0));
        }
        return User.TIER_BORDER[tierName] + User.GRADE_INTERVAL * (6 - (grade || 0));
    }
</script>

<div class="container">
    <span
        class="current"
        style={tierName === "pearl"
            ? ""
            : tierName === "omega"
              ? "color:#00d17d;"
              : `color:${User.TIER_COLOR[tierName]}`}
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
                    : `background:${User.TIER_COLOR[tierName]};`)}
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
